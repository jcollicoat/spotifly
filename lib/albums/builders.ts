import { getAverageColor } from 'fast-average-color-node';
import { appendUUID } from '../_helpers/helpers';
import { ImageSize } from '../_helpers/types';
import {
    buildAudioFeatures,
    buildAudioFeaturesListToSingle,
} from '../_addons/builders';
import { AudioFeaturesDTO } from '../_addons/types';
import {
    Album,
    AlbumAddonsDTO,
    AlbumDTO,
    AlbumArtist,
    AlbumsAddonsDTO,
    AlbumTrack,
    AlbumTrackAddonsDTO,
    AlbumArtistDTO,
    AlbumTrackDTO,
    AlbumsDTO,
} from './types';

const buildAlbumArtists = (
    albumArtistsDTOs: AlbumArtistDTO[],
    artistIDs?: string[]
): AlbumArtist[] =>
    albumArtistsDTOs.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
        top_artist: (artistIDs && artistIDs.includes(artist.id)) ?? false,
    }));

const findAlbumTrackAddons = (
    addons: AlbumAddonsDTO,
    trackID: string,
    index: number
): AlbumTrackAddonsDTO => {
    return {
        audioFeaturesAPI: addons.audioFeaturesListAPI.audio_features.find(
            (featureSet) => featureSet.id === trackID
        ) as AudioFeaturesDTO, // This will never be undefined unless the API breaks
        checkSavedAPI: [addons.checkSavedAPI[index]],
    };
};

const buildAlbumTracks = (
    albumTracksDTOs: AlbumTrackDTO[],
    addons?: AlbumAddonsDTO
): AlbumTrack[] =>
    albumTracksDTOs.map((track, index) => {
        const singleAddons =
            addons && findAlbumTrackAddons(addons, track.id, index);
        return {
            id: track.id,
            duration_ms: track.duration_ms,
            explicit: track.explicit,
            key: appendUUID(track.id),
            name: track.name,
            type: track.type,
            audio_features:
                singleAddons &&
                buildAudioFeatures(singleAddons.audioFeaturesAPI),
            saved: singleAddons && singleAddons.checkSavedAPI[0],
        };
    });

export const buildAlbum = async (
    albumAPI: AlbumDTO,
    addons?: AlbumAddonsDTO,
    imageSize?: ImageSize
): Promise<Album> => {
    const color = await getAverageColor(albumAPI.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${albumAPI.id} (${albumAPI.name}).`
        );
    }

    let artistIDs = undefined;
    if (addons) {
        artistIDs = addons.topArtistsAPI.items.map((topArtist) => topArtist.id);
    }

    return {
        id: albumAPI.id,
        album_type: albumAPI.album_type,
        artists: buildAlbumArtists(albumAPI.artists, artistIDs),
        color: color.hex,
        image: albumAPI.images[imageSize ?? 2].url,
        key: appendUUID(albumAPI.id),
        name: albumAPI.name,
        release_date: albumAPI.release_date,
        total_tracks: albumAPI.total_tracks,
        tracks: buildAlbumTracks(albumAPI.tracks.items, addons),
        audio_features:
            addons &&
            buildAudioFeaturesListToSingle(addons.audioFeaturesListAPI),
    };
};

export const buildAlbums = async (
    albumsAPI: AlbumsDTO,
    addons?: AlbumsAddonsDTO,
    imageSize?: ImageSize
): Promise<Album[]> => {
    return await Promise.all(
        albumsAPI.albums.map(
            async (albumAPI) => await buildAlbum(albumAPI, addons, imageSize)
        )
    );
};

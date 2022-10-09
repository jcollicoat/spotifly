import { getAverageColor } from 'fast-average-color-node';
import { appendUUID } from '../_helpers/helpers';
import { ImageSize } from '../_helpers/types';
import { buildAudioFeaturesListToSingle } from '../addons/builders';
import { IAddonsAlbum, IAddonsDTO } from '../addons/types';
import {
    IAlbum,
    IAlbumAPI,
    IAlbumArtist,
    IAlbumArtistDTO,
    IAlbumsAPI,
    IAlbumTrack,
    IAlbumTrackDTO,
} from './types';

const buildAlbumArtists = (
    albumArtistsDTOs: IAlbumArtistDTO[]
): IAlbumArtist[] => {
    return albumArtistsDTOs.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));
};

const buildAlbumTracks = (albumTracksDTOs: IAlbumTrackDTO[]): IAlbumTrack[] => {
    return albumTracksDTOs.map((track) => ({
        id: track.id,
        artists: [],
        duration_ms: 0,
        explicit: false,
        key: appendUUID(track.id),
        name: track.name,
    }));
};

export const buildAlbum = async (
    albumAPI: IAlbumAPI,
    addons?: IAddonsDTO,
    imageSize?: ImageSize
): Promise<IAlbum> => {
    const color = await getAverageColor(albumAPI.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${albumAPI.id} (${albumAPI.name}).`
        );
    }

    let builtAddons: IAddonsAlbum | undefined = undefined;
    if (addons) {
        builtAddons = {
            audio_features: addons.audio_features
                ? buildAudioFeaturesListToSingle(addons.audio_features)
                : undefined,
        };
    }

    return {
        id: albumAPI.id,
        album_type: albumAPI.album_type,
        artists: buildAlbumArtists(albumAPI.artists),
        color: color.hex,
        image: albumAPI.images[imageSize ?? 2].url,
        key: appendUUID(albumAPI.id),
        name: albumAPI.name,
        release_date: albumAPI.release_date,
        total_tracks: albumAPI.total_tracks,
        tracks: buildAlbumTracks(albumAPI.tracks.items),
        ...builtAddons,
    };
};

export const buildAlbums = async (
    albumsAPI: IAlbumsAPI,
    addons?: IAddonsDTO,
    imageSize?: ImageSize
): Promise<IAlbum[]> => {
    return await Promise.all(
        albumsAPI.albums.map(
            async (albumAPI) => await buildAlbum(albumAPI, addons, imageSize)
        )
    );
};

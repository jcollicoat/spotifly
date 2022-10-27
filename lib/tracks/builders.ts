import { getAverageColor } from 'fast-average-color-node';
import { reduceAlbum, reduceArtists, appendUUID } from '../_helpers/helpers';
import { IAlbumMinimum, ImageSize } from '../_helpers/types';
import {
    buildAudioFeatures,
    buildAudioFeaturesListToSingle,
} from '../addons/builders';
import { IAddonsDTO, IAudioFeaturesAPI } from '../addons/types';
import { IAlbumAPI } from '../albums/types';
import { IArtistAPI } from '../artists/types';
import {
    IRecentlyPlayed,
    IRecentlyPlayedAPI,
    ITopTrack,
    ITopTrackArtist,
    ITopTracks,
    ITopTracksAPI,
    ITrack,
    ITrackAddonsDTO,
    ITrackAPI,
    ITrackArtistDTO,
    ITracksAddonsDTO,
} from './types';

const buildTrackAlbum = (album: IAlbumAPI): IAlbumMinimum => ({
    id: album.id,
    key: appendUUID(album.id),
    name: album.name,
});

const buildTrackArtists = (
    artistsDTO: IArtistAPI[] | ITrackArtistDTO[],
    artistIDs?: string[]
): ITopTrackArtist[] =>
    artistsDTO.map((artistDTO) => {
        let isTopArtist = false;
        if (artistIDs) {
            isTopArtist = artistIDs.includes(artistDTO.id);
        }
        return {
            id: artistDTO.id,
            key: appendUUID(artistDTO.id),
            name: artistDTO.name,
            top_artist: isTopArtist,
        };
    });

export const buildTrack = async (
    trackAPI: ITrackAPI,
    addons?: IAddonsDTO,
    imageSize?: ImageSize
): Promise<ITrack> => {
    const color = await getAverageColor(trackAPI.album.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${trackAPI.id} (${trackAPI.name}).`
        );
    }

    if (addons) {
        const audio_features = addons.audio_features?.audio_features.find(
            (featureSet) => featureSet.id === trackAPI.id
        );

        const track: ITrack = {
            id: trackAPI.id,
            album: reduceAlbum(trackAPI.album),
            artists: reduceArtists(trackAPI.artists),
            audio_features:
                audio_features && buildAudioFeatures(audio_features),
            color: color.hex,
            image: trackAPI.album.images[imageSize ?? 2].url,
            key: appendUUID(trackAPI.id),
            name: trackAPI.name,
            popularity: trackAPI.popularity,
            type: trackAPI.type,
        };
        return track;
    }

    const track: ITrack = {
        id: trackAPI.id,
        album: reduceAlbum(trackAPI.album),
        artists: reduceArtists(trackAPI.artists),
        color: color.hex,
        image: trackAPI.album.images[imageSize ?? 2].url,
        key: appendUUID(trackAPI.id),
        name: trackAPI.name,
        popularity: trackAPI.popularity,
        type: trackAPI.type,
    };
    return track;
};

export const buildTracks = async (
    trackAPIs: ITrackAPI[],
    addons?: IAddonsDTO,
    imageSize?: ImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackAPIs.map(
            async (track) => await buildTrack(track, addons, imageSize)
        )
    );
};

export const buildRecentlyPlayed = async (
    recentlyPlayedAPI: IRecentlyPlayedAPI,
    addons?: IAddonsDTO
): Promise<IRecentlyPlayed> => {
    return {
        items: await buildTracks(
            recentlyPlayedAPI.items.map((item) => item.track),
            addons
        ),
        limit: recentlyPlayedAPI.limit,
        next: recentlyPlayedAPI.next,
        cursors: {
            after: recentlyPlayedAPI.cursors.after,
        },
        total: recentlyPlayedAPI.total,
    };
};

export const buildTopTrack = async (
    topTrackAPI: ITrackAPI,
    addons?: ITrackAddonsDTO
): Promise<ITopTrack> => {
    const color = await getAverageColor(topTrackAPI.album.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${topTrackAPI.id} (${topTrackAPI.name}).`
        );
    }

    let artistIDs = undefined;
    if (addons) {
        artistIDs = addons.topArtistsAPI.items.map((topArtist) => topArtist.id);
    }

    return {
        id: topTrackAPI.id,
        album: buildTrackAlbum(topTrackAPI.album),
        artists: buildTrackArtists(topTrackAPI.artists, artistIDs),
        color: color.hex,
        image: topTrackAPI.album.images[0].url,
        key: appendUUID(topTrackAPI.id),
        name: topTrackAPI.name,
        popularity: topTrackAPI.popularity,
        type: topTrackAPI.type,
        audio_features: addons && buildAudioFeatures(addons.audioFeaturesAPI),
        saved: addons && addons.checkSavedAPI[0] === true,
    };
};

const getSingleTrackAddonsFromList = (
    addons: ITracksAddonsDTO,
    trackID: string
): ITrackAddonsDTO => {
    return {
        audioFeaturesAPI: addons.audioFeaturesAPI.audio_features.find(
            (featureSet) => featureSet.id === trackID
        ) as IAudioFeaturesAPI, // This will never be undefined unless the API breaks
        checkSavedAPI: addons.checkSavedAPI,
        topArtistsAPI: addons.topArtistsAPI,
    };
};

export const buildTopTracks = async (
    topTracksAPI: ITopTracksAPI,
    addons?: ITracksAddonsDTO
): Promise<ITopTracks> => {
    if (addons) {
        return {
            items: await Promise.all(
                topTracksAPI.items.map(
                    async (track) =>
                        await buildTopTrack(
                            track,
                            getSingleTrackAddonsFromList(addons, track.id)
                        )
                )
            ),
            next: topTracksAPI.next,
            offset: topTracksAPI.offset,
            previous: topTracksAPI.previous,
            total: topTracksAPI.total,
            audio_features: buildAudioFeaturesListToSingle(
                addons.audioFeaturesAPI
            ),
        };
    }

    return {
        items: await Promise.all(
            topTracksAPI.items.map(
                async (track) => await buildTopTrack(track, addons)
            )
        ),
        next: topTracksAPI.next,
        offset: topTracksAPI.offset,
        previous: topTracksAPI.previous,
        total: topTracksAPI.total,
    };
};

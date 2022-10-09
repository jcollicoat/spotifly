import { getAverageColor } from 'fast-average-color-node';
import { reduceAlbum, reduceArtists, appendUUID } from '../_helpers/helpers';
import { ImageSize } from '../_helpers/types';
import { buildAudioFeatures } from '../addons/builders';
import { IAddonsDTO } from '../addons/types';
import {
    IRecentlyPlayed,
    IRecentlyPlayedAPI,
    ITopTracks,
    ITopTracksAPI,
    ITrack,
    ITrackAPI,
} from './types';

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

export const buildTopTracks = async (
    topTracksAPI: ITopTracksAPI,
    addons?: IAddonsDTO
): Promise<ITopTracks> => {
    return {
        items: await buildTracks(topTracksAPI.items, addons),
        next: topTracksAPI.next,
        offset: topTracksAPI.offset,
        previous: topTracksAPI.previous,
        total: topTracksAPI.total,
    };
};

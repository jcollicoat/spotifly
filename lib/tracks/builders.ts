import { getAverageColor } from 'fast-average-color-node';
import { appendUUID } from '../_helpers/helpers';
import { IAlbumMinimum, ImageSize } from '../_helpers/types';
import {
    buildAudioFeatures,
    buildAudioFeaturesListToSingle,
} from '../addons/builders';
import { IAudioFeaturesAPI } from '../addons/types';
import { IAlbumAPI } from '../albums/types';
import { IArtistAPI } from '../artists/types';
import {
    IRecentlyPlayedAPI,
    ITopTracksAPI,
    ITrack,
    ITrackArtist,
    ITrackAddonsDTO,
    ITrackAPI,
    ITrackArtistDTO,
    ITracksAddonsDTO,
    ITracks,
    TopTracksMeta,
    RecentlyPlayedMeta,
} from './types';

const buildTrackAlbum = (album: IAlbumAPI): IAlbumMinimum => ({
    id: album.id,
    key: appendUUID(album.id),
    name: album.name,
});

const buildTrackArtists = (
    artistsDTO: IArtistAPI[] | ITrackArtistDTO[],
    artistIDs?: string[]
): ITrackArtist[] =>
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
    addons?: ITrackAddonsDTO,
    imageSize?: ImageSize
): Promise<ITrack> => {
    const color = await getAverageColor(trackAPI.album.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${trackAPI.id} (${trackAPI.name}).`
        );
    }

    let artistIDs = undefined;
    if (addons) {
        artistIDs = addons.topArtistsAPI.items.map((topArtist) => topArtist.id);
    }

    return {
        id: trackAPI.id,
        album: buildTrackAlbum(trackAPI.album),
        artists: buildTrackArtists(trackAPI.artists, artistIDs),
        color: color.hex,
        image: trackAPI.album.images[imageSize ?? 2].url,
        key: appendUUID(trackAPI.id),
        name: trackAPI.name,
        popularity: trackAPI.popularity,
        type: trackAPI.type,
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

export const buildTracks = async (
    trackAPIs: ITrackAPI[],
    addons?: ITracksAddonsDTO,
    imageSize?: ImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackAPIs.map(
            async (track) =>
                await buildTrack(
                    track,
                    addons && getSingleTrackAddonsFromList(addons, track.id),
                    imageSize
                )
        )
    );
};

export const buildRecentlyPlayed = async (
    recentlyPlayedAPI: IRecentlyPlayedAPI,
    addons?: ITracksAddonsDTO
): Promise<ITracks<RecentlyPlayedMeta>> => {
    return {
        items: await buildTracks(
            recentlyPlayedAPI.items.map((item) => item.track),
            addons
        ),
        meta: {
            limit: recentlyPlayedAPI.limit,
            next: recentlyPlayedAPI.next,
            cursors: {
                after: recentlyPlayedAPI.cursors.after,
            },
            total: recentlyPlayedAPI.total,
        },
    };
};

export const buildTopTracks = async (
    topTracksAPI: ITopTracksAPI,
    addons?: ITracksAddonsDTO
): Promise<ITracks<TopTracksMeta>> => {
    if (addons) {
        return {
            items: await buildTracks(topTracksAPI.items, addons),
            meta: {
                next: topTracksAPI.next,
                offset: topTracksAPI.offset,
                previous: topTracksAPI.previous,
                total: topTracksAPI.total,
            },
            audio_features: buildAudioFeaturesListToSingle(
                addons.audioFeaturesAPI
            ),
        };
    }

    return {
        items: await Promise.all(
            topTracksAPI.items.map(
                async (track) => await buildTrack(track, addons)
            )
        ),
        meta: {
            next: topTracksAPI.next,
            offset: topTracksAPI.offset,
            previous: topTracksAPI.previous,
            total: topTracksAPI.total,
        },
    };
};

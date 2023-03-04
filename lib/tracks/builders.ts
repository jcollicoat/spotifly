import { getAverageColor } from 'fast-average-color-node';
import { appendUUID } from '../_helpers/helpers';
import { AlbumMinimum, ImageSize } from '../_helpers/types';
import {
    buildAudioFeatures,
    buildAudioFeaturesListToSingle,
} from '../addons/builders';
import { AudioFeaturesDTO } from '../addons/types';
import { IGetAlbumAPI } from '../albums/types';
import { IGetArtistAPI } from '../artists/types';
import {
    IGetRecentlyPlayedAPI,
    IGetTopTracksAPI,
    ITrack,
    ITrackArtist,
    ITrackAddonsDTO,
    IGetTrackAPI,
    ITrackArtistDTO,
    ITracksAddonsDTO,
    ITracks,
    TopTracksMeta,
    RecentlyPlayedMeta,
} from './types';

const buildTrackAlbum = (album: IGetAlbumAPI): AlbumMinimum => ({
    id: album.id,
    key: appendUUID(album.id),
    name: album.name,
});

const buildTrackArtists = (
    artistsDTO: IGetArtistAPI[] | ITrackArtistDTO[],
    artistIDs?: string[]
): ITrackArtist[] =>
    artistsDTO.map((artistDTO) => ({
        id: artistDTO.id,
        key: appendUUID(artistDTO.id),
        name: artistDTO.name,
        top_artist: (artistIDs && artistIDs.includes(artistDTO.id)) ?? false,
    }));

export const buildTrack = async (
    trackAPI: IGetTrackAPI,
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
        saved: addons && addons.checkSavedAPI[0],
    };
};

export const getSingleTrackAddonsFromList = (
    addons: ITracksAddonsDTO,
    trackID: string,
    index: number
): ITrackAddonsDTO => ({
    audioFeaturesAPI: addons.audioFeaturesListAPI.audio_features.find(
        (featureSet) => featureSet.id === trackID
    ) as AudioFeaturesDTO, // This will never be undefined unless the API breaks
    checkSavedAPI: [addons.checkSavedAPI[index]],
    topArtistsAPI: addons.topArtistsAPI,
});

export const buildTracks = async (
    trackAPIs: IGetTrackAPI[],
    addons?: ITracksAddonsDTO,
    imageSize?: ImageSize
): Promise<ITrack[]> =>
    await Promise.all(
        trackAPIs.map(
            async (track, index) =>
                await buildTrack(
                    track,
                    addons &&
                        getSingleTrackAddonsFromList(addons, track.id, index),
                    imageSize
                )
        )
    );

export const buildRecentlyPlayed = async (
    recentlyPlayedAPI: IGetRecentlyPlayedAPI,
    addons?: ITracksAddonsDTO
): Promise<ITracks<RecentlyPlayedMeta>> => ({
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
    audio_features:
        addons && buildAudioFeaturesListToSingle(addons.audioFeaturesListAPI),
});

export const buildTopTracks = async (
    topTracksAPI: IGetTopTracksAPI,
    addons?: ITracksAddonsDTO
): Promise<ITracks<TopTracksMeta>> => ({
    items: await buildTracks(topTracksAPI.items, addons),
    meta: {
        next: topTracksAPI.next,
        offset: topTracksAPI.offset,
        previous: topTracksAPI.previous,
        total: topTracksAPI.total,
    },
    audio_features:
        addons && buildAudioFeaturesListToSingle(addons.audioFeaturesListAPI),
});

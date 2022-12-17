import axios from 'axios';
import {
    EPAudioFeaturesList,
    EPCheckSaved,
    EPTopArtists,
} from '../_helpers/endpoints';
import { ICheckSavedAPI } from '../_helpers/types';
import { IGetAudioFeaturesListAPI } from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { IAlbumAddonsDTO, IAlbumsAddonsDTO, IGetAlbumAPI } from './types';

export const getAlbumAddons = async (
    access_token: string,
    albumAPI: IGetAlbumAPI
): Promise<IAlbumAddonsDTO> => {
    const trackIDs = albumAPI.tracks.items.map((track) => track.id).join(',');

    const audioFeaturesListAPI = await axios.get<IGetAudioFeaturesListAPI>(
        EPAudioFeaturesList,
        {
            headers: {
                Authorization: access_token,
            },
            params: {
                ids: trackIDs,
            },
        }
    );

    const checkSavedAPI = await axios.get<ICheckSavedAPI>(EPCheckSaved, {
        headers: {
            Authorization: access_token,
        },
        params: {
            ids: trackIDs,
        },
    });

    const topArtistsAPI = await axios.get<ITopArtistsAPI>(EPTopArtists, {
        headers: {
            Authorization: access_token,
        },
    });

    return {
        audioFeaturesListAPI: audioFeaturesListAPI.data,
        checkSavedAPI: checkSavedAPI.data,
        topArtistsAPI: topArtistsAPI.data,
    };
};

export const getAlbumsAddons = async (
    access_token: string,
    trackIDsByAlbum: {
        albumID: string;
        trackIDs: string[];
    }[]
): Promise<IAlbumsAddonsDTO> => {
    const audioFeaturesListAPIs = await Promise.all(
        trackIDsByAlbum.map(async (trackSet) => {
            const audioFeaturesListAPI =
                await axios.get<IGetAudioFeaturesListAPI>(EPAudioFeaturesList, {
                    headers: {
                        Authorization: access_token,
                    },
                    params: {
                        ids: trackSet.trackIDs.toString(),
                    },
                });
            return {
                audioFeaturesListAPI: audioFeaturesListAPI.data,
                id: trackSet.albumID,
            };
        })
    );

    const checkSavedAPIs = await Promise.all(
        trackIDsByAlbum.map(async (trackSet) => {
            const checkSavedAPI = await axios.get<ICheckSavedAPI>(
                EPCheckSaved,
                {
                    headers: {
                        Authorization: access_token,
                    },
                    params: {
                        ids: trackSet.trackIDs,
                    },
                }
            );
            return {
                checkSavedAPI: checkSavedAPI.data,
                id: trackSet.albumID,
            };
        })
    );

    const topArtistsAPIs = await Promise.all(
        trackIDsByAlbum.map(async (trackSet) => {
            const topArtistsAPI = await axios.get<ITopArtistsAPI>(
                EPTopArtists,
                {
                    headers: {
                        Authorization: access_token,
                    },
                }
            );
            return {
                topArtistsAPI: topArtistsAPI.data,
                id: trackSet.albumID,
            };
        })
    );

    return {
        addonSets: trackIDsByAlbum.map((trackSet) => {
            const matchedAudioFeatures = audioFeaturesListAPIs.find(
                (set) => set.id === trackSet.albumID
            );
            const matchedCheckSaved = checkSavedAPIs.find(
                (set) => set.id === trackSet.albumID
            );
            const matchedTopArtists = topArtistsAPIs.find(
                (set) => set.id === trackSet.albumID
            );

            if (
                !matchedAudioFeatures ||
                !matchedCheckSaved ||
                !matchedTopArtists
            ) {
                throw new Error(
                    `Couldn't find addons for album: ${trackSet.albumID}`
                );
            }

            return {
                addons: {
                    audioFeaturesListAPI:
                        matchedAudioFeatures.audioFeaturesListAPI,
                    checkSavedAPI: matchedCheckSaved.checkSavedAPI,
                    topArtistsAPI: matchedTopArtists.topArtistsAPI,
                },
                id: trackSet.albumID,
            };
        }),
    };
};

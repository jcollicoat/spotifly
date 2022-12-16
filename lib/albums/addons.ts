import axios from 'axios';
import {
    EPAudioFeaturesList,
    EPCheckSaved,
    EPTopArtists,
} from '../_helpers/endpoints';
import { ICheckSavedAPI } from '../_helpers/types';
import { IAudioFeaturesListAPI, IAudioFeaturesListsDTO } from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { IAlbumAddonsDTO, IAlbumsAddonsDTO } from './types';

export const getAlbumAddons = async (
    access_token: string,
    trackIDs: string
): Promise<IAlbumAddonsDTO> => {
    const audioFeaturesListAPI = await axios.get<IAudioFeaturesListAPI>(
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

    const topArtistsAPI = await axios.get<ITopArtistsAPI>(EPTopArtists, {
        headers: {
            Authorization: access_token,
        },
    });

    const checkSavedAPI = await axios.get<ICheckSavedAPI>(EPCheckSaved, {
        headers: {
            Authorization: access_token,
        },
        params: {
            ids: trackIDs,
        },
    });

    return {
        audioFeaturesListAPI: audioFeaturesListAPI.data,
        topArtistsAPI: topArtistsAPI.data,
        checkSavedAPI: checkSavedAPI.data,
    };
};

export const getAlbumsAddons = async (
    access_token: string,
    trackIDsByAlbum: {
        albumID: string;
        trackIDs: string[];
    }[]
): Promise<IAlbumsAddonsDTO> => {
    const audioFeaturesListsDTOs: IAudioFeaturesListsDTO[] = await Promise.all(
        trackIDsByAlbum.map(async (trackSet) => {
            const audioFeaturesListAPI = await axios.get<IAudioFeaturesListAPI>(
                EPAudioFeaturesList,
                {
                    headers: {
                        Authorization: access_token,
                    },
                    params: {
                        ids: trackSet.trackIDs.toString(),
                    },
                }
            );

            return {
                audio_features: audioFeaturesListAPI.data.audio_features,
                id: trackSet.albumID,
            };
        })
    );

    return {
        audioFeaturesListsDTOs: audioFeaturesListsDTOs,
    };
};

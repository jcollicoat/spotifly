import axios from 'axios';
import {
    EPAudioFeatures,
    EPAudioFeaturesList,
    EPCheckSaved,
    EPTopArtists,
} from '../_helpers/endpoints';
import { CheckSavedDTO } from '../_helpers/types';
import {
    IGetAudioFeaturesAPI,
    IGetAudioFeaturesListAPI,
} from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { ITrackAddonsDTO, ITracksAddonsDTO } from './types';

export const getTrackAddons = async (
    access_token: string,
    trackID: string
): Promise<ITrackAddonsDTO> => {
    const audioFeaturesAPI = await axios.get<IGetAudioFeaturesAPI>(
        EPAudioFeatures + trackID,
        {
            headers: {
                Authorization: access_token,
            },
        }
    );

    const topArtistsAPI = await axios.get<ITopArtistsAPI>(EPTopArtists, {
        headers: {
            Authorization: access_token,
        },
    });

    const checkSavedAPI = await axios.get<CheckSavedDTO>(EPCheckSaved, {
        headers: {
            Authorization: access_token,
        },
        params: {
            ids: trackID,
        },
    });

    return {
        audioFeaturesAPI: audioFeaturesAPI.data,
        topArtistsAPI: topArtistsAPI.data,
        checkSavedAPI: checkSavedAPI.data,
    };
};

export const getTracksAddons = async (
    access_token: string,
    trackIDs: string
): Promise<ITracksAddonsDTO> => {
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

    const topArtistsAPI = await axios.get<ITopArtistsAPI>(EPTopArtists, {
        headers: {
            Authorization: access_token,
        },
    });

    const checkSavedAPI = await axios.get<CheckSavedDTO>(EPCheckSaved, {
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

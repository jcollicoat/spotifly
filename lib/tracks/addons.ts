import axios from 'axios';
import {
    EPAudioFeatures,
    EPCheckSaved,
    EPTopArtists,
} from '../_helpers/endpoints';
import { CheckSavedAPI } from '../_helpers/types';
import { IAudioFeaturesAPI, IAudioFeaturesListAPI } from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { ITrackAddonsDTO, ITracksAddonsDTO } from './types';

export const getTrackAddons = async (
    access_token: string,
    trackID: string
): Promise<ITrackAddonsDTO> => {
    const audioFeaturesAPI = await axios.get<IAudioFeaturesAPI>(
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

    const checkSavedAPI = await axios.get<CheckSavedAPI>(EPCheckSaved, {
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
    const audioFeaturesAPI = await axios.get<IAudioFeaturesListAPI>(
        EPAudioFeatures,
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

    const checkSavedAPI = await axios.get<CheckSavedAPI>(EPCheckSaved, {
        headers: {
            Authorization: access_token,
        },
        params: {
            ids: trackIDs,
        },
    });

    return {
        audioFeaturesAPI: audioFeaturesAPI.data,
        topArtistsAPI: topArtistsAPI.data,
        checkSavedAPI: checkSavedAPI.data,
    };
};

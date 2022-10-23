import axios from 'axios';
import { CheckSavedAPI } from '../_helpers/types';
import { IAudioFeaturesAPI } from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import {
    EPAudioFeatures,
    EPCheckSaved,
    EPTopArtists,
} from '../spotify/endpoints';
import { ITrackAddonsDTO } from './types';

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

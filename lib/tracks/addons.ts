import axios from 'axios';
import {
    EPAudioFeatures,
    EPAudioFeaturesList,
    EPCheckSaved,
    EPTopArtists,
} from '../_helpers/endpoints';
import { CheckSavedDTO } from '../_helpers/types';
import { AudioFeaturesDTO, AudioFeaturesListDTO } from '../_addons/types';
import { TopArtistsDTO } from '../artists/types';
import { TrackAddonsDTO, TracksAddonsDTO } from './types';

export const getTrackAddons = async (
    access_token: string,
    trackID: string
): Promise<TrackAddonsDTO> => {
    const audioFeaturesAPI = await axios.get<AudioFeaturesDTO>(
        EPAudioFeatures + trackID,
        {
            headers: {
                Authorization: access_token,
            },
        }
    );

    const topArtistsAPI = await axios.get<TopArtistsDTO>(EPTopArtists, {
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
): Promise<TracksAddonsDTO> => {
    const audioFeaturesListAPI = await axios.get<AudioFeaturesListDTO>(
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

    const topArtistsAPI = await axios.get<TopArtistsDTO>(EPTopArtists, {
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

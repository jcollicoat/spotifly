import axios from 'axios';
import { EPCheckSaved, EPTopArtists } from '../_helpers/endpoints';
import { ICheckSavedAPI } from '../_helpers/types';
import { IAudioFeaturesListAPI } from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { IAlbumAddonsDTO } from './types';

const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

export const getAlbumAddons = async (
    access_token: string,
    trackIDs: string
): Promise<IAlbumAddonsDTO> => {
    const audioFeaturesListAPI = await axios.get<IAudioFeaturesListAPI>(
        endpoint_audio_features,
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

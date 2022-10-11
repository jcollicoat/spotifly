import axios from 'axios';
import { IAddonsDTO, IAudioFeaturesListAPI } from '../addons/types';
import { IAlbumAPI } from './types';

const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

export const getAlbumAddons = async (
    access_token: string,
    albumAPI: IAlbumAPI
): Promise<IAddonsDTO> => {
    const trackIDs = albumAPI.tracks.items.map((track) => track.id).join(',');
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

    return {
        audio_features: audioFeaturesListAPI.data,
    };
};

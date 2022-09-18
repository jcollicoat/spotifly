import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    ITopTracksDTO,
    ITrackDTO,
    IUserProfileDTO,
} from '../lib/interfaces/spotify';

export const getTopTracks = async (): Promise<ITopTracksDTO> => {
    const { data } = await axios.get('/api/spotify/getTopTracks');
    return data;
};

export const getTrack = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<ITrackDTO> => {
    const { data } = await axios.get('/api/spotify/getTrack', {
        params: { trackId: queryKey[0] },
    });
    return data;
};

export const getUserProfile = async (): Promise<IUserProfileDTO> => {
    const { data } = await axios.get('/api/spotify/getUserProfile');
    return data;
};

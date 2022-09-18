import axios from 'axios';
import { ITopTracksDTO, IUserProfileDTO } from '../lib/interfaces/spotify';

export const getTopTracks = async (): Promise<ITopTracksDTO> => {
    const { data } = await axios.get('/api/spotify/getTopTracks');
    return data;
};

export const getUserProfile = async (): Promise<IUserProfileDTO> => {
    const { data } = await axios.get('/api/spotify/getUserProfile');
    return data;
};

import axios from 'axios';
import { ITopTracksDTO } from '../lib/interfaces/spotify';

export const getTopTracks = async (): Promise<ITopTracksDTO> => {
    const { data } = await axios.get('/api/spotify/getTopTracks');
    return data;
};

import axios from 'axios';
import { ITopTracksDTO } from '../interfaces/spotify/ITopTracksDTO';

export const getTopTracks = async (): Promise<ITopTracksDTO> => {
    const { data } = await axios.get('/api/spotify/topTracks');
    return data;
};

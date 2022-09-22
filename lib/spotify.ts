import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbumDTO,
    ITopTracksDTO,
    ITrackDTO,
    IUserProfileDTO,
} from '../lib/interfaces/spotify';

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbumDTO> => {
    const { data } = await axios.get('/api/spotify/getAlbum', {
        params: { albumId: queryKey[1] },
    });
    return data;
};

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbumDTO[]> => {
    const { data } = await axios.get('/api/spotify/getAlbums', {
        params: { albumIds: queryKey[1] },
    });
    return data;
};

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
        params: { trackId: queryKey[1] },
    });
    return data;
};

export const getUserProfile = async (): Promise<IUserProfileDTO> => {
    const { data } = await axios.get('/api/spotify/getUserProfile');
    return data;
};

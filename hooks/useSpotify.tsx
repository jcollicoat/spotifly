import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
    getRecentlyPlayed,
    getRecentlyPlayedSingle,
    getTopAlbums,
    getTopTracks,
} from '../lib/client/spotify';
import {
    IRecentlyPlayed,
    ITopAlbums,
    ITopTracks,
    ITrack,
} from '../lib/client/spotify-types';
import { TimeMS } from '../lib/constants';

export const useRecentlyPlayed = (): UseQueryResult<IRecentlyPlayed> => {
    return useQuery(['recently-played'], getRecentlyPlayed, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useRecentlyPlayedSingle = (): UseQueryResult<ITrack> => {
    return useQuery(['recently-played'], getRecentlyPlayedSingle, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useTopAlbums = (): UseQueryResult<ITopAlbums> => {
    return useQuery(['top-albums'], getTopAlbums, {
        staleTime: Infinity,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracks> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

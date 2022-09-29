import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TimeMS } from '../lib/constants';
import { IRecentlyPlayed, ITopTracks } from '../lib/interfaces/spotify';
import { getRecentlyPlayed, getTopTracks } from '../lib/spotify';

export const useRecentlyPlayed = (): UseQueryResult<IRecentlyPlayed> => {
    return useQuery(['recently-played'], getRecentlyPlayed, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracks> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

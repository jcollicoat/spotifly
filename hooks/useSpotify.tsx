import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TimeMS } from '../lib/constants';
import {
    getRecentlyPlayed,
    getRecentlyPlayedTrack,
    getTopTracks,
} from '../lib/spotify';
import { IRecentlyPlayed, ITopTracks, ITrack } from '../lib/spotify-types';

export const useRecentlyPlayed = (): UseQueryResult<IRecentlyPlayed> => {
    return useQuery(['recently-played'], getRecentlyPlayed, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useRecentlyPlayedTrack = (): UseQueryResult<ITrack> => {
    return useQuery(['recently-played'], getRecentlyPlayedTrack, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracks> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

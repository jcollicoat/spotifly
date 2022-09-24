import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TimeConstants } from '../lib/constants';
import { IRecentlyPlayedDTO, ITopTracksDTO } from '../lib/interfaces/spotify';
import { getRecentlyPlayed, getTopTracks } from '../lib/spotify';

export const useRecentlyPlayed = (): UseQueryResult<IRecentlyPlayedDTO> => {
    return useQuery(['recently-played'], getRecentlyPlayed, {
        staleTime: TimeConstants.HourMS,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracksDTO> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

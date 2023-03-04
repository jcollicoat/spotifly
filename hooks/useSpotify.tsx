import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TimeMS } from '../lib/_helpers/constants';
import { TopArtists } from '../lib/artists/types';
import {
    getRecentlyPlayed,
    getRecentlyPlayedSingle,
    getTopArtists,
    getTopTracks,
} from '../lib/client/api';
import { IRecentlyPlayed, Track, ITopTracks } from '../lib/tracks/types';

export const useRecentlyPlayed = (): UseQueryResult<IRecentlyPlayed> => {
    return useQuery(['recently-played'], getRecentlyPlayed, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useRecentlyPlayedSingle = (): UseQueryResult<Track> => {
    return useQuery(['recently-played'], getRecentlyPlayedSingle, {
        staleTime: TimeMS.Minutes5,
    });
};

export const useTopArtists = (): UseQueryResult<TopArtists> => {
    return useQuery(['top-artists'], getTopArtists, {
        staleTime: Infinity,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracks> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

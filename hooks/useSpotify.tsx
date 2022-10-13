import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TimeMS } from '../lib/_helpers/constants';
import { ITopArtists } from '../lib/artists/types';
import {
    getRecentlyPlayed,
    getRecentlyPlayedSingle,
    getTopArtists,
    getTopTracks,
} from '../lib/client/spotify';
import { IRecentlyPlayed, ITrack, ITopTracks } from '../lib/tracks/types';

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

export const useTopArtists = (): UseQueryResult<ITopArtists> => {
    return useQuery(['top-artists'], getTopArtists, {
        staleTime: Infinity,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracks> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

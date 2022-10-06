import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
    getRecentlyPlayed,
    getRecentlyPlayedSingle,
    getTopAlbums,
    getTopArtists,
    getTopTracks,
} from '../lib/client/spotify';
import {
    IRecentlyPlayed,
    ISmallListArtist,
    ISmallListTrack,
    ITopAlbums,
    ITopArtists,
    ITopTracks,
    ITrack,
} from '../lib/client/spotify-types';
import { TimeMS } from '../lib/constants';

export const useRecentlyPlayed = (): UseQueryResult<
    IRecentlyPlayed<ISmallListTrack>
> => {
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

export const useTopArtists = (): UseQueryResult<
    ITopArtists<ISmallListArtist>
> => {
    return useQuery(['top-artists'], getTopArtists, {
        staleTime: Infinity,
    });
};

export const useTopTracks = (): UseQueryResult<ITopTracks<ITrack>> => {
    return useQuery(['top-tracks'], getTopTracks, {
        staleTime: Infinity,
    });
};

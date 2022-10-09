import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TimeMS } from '../lib/_helpers/constants';
import { ITopAlbums } from '../lib/albums/types';
import { ITopArtists } from '../lib/artists/types';
import {
    getRecentlyPlayed,
    getRecentlyPlayedSingle,
    getTopAlbums,
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

export const useTopAlbums = (): UseQueryResult<ITopAlbums> => {
    return useQuery(['top-albums'], getTopAlbums, {
        staleTime: Infinity,
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

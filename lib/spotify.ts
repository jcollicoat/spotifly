import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbum,
    IArtistDTO,
    IRecentlyPlayed,
    IRecentlyPlayedTrackDTO,
    ISpotifyImageDTO,
    ITopTracks,
    ITrack,
    ITrackDTO,
    IUserProfileDTO,
} from '../lib/interfaces/spotify';
import { appendUUID } from './helpers';

export interface IAlbumArtistDTO {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface IGetAlbum {
    album_type: string;
    artists: IAlbumArtistDTO[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: ISpotifyImageDTO[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

const buildAlbum = (data: IGetAlbum): IAlbum => {
    const album: IAlbum = {
        album_type: data.album_type,
        artists: data.artists,
        id: data.id,
        images: data.images,
        name: data.name,
        release_date: data.release_date,
        total_tracks: data.total_tracks,
        type: data.type,
        unique_id: appendUUID(data.id),
    };
    return album;
};

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum> => {
    const { data }: { data: IGetAlbum } = await axios.get(
        '/api/spotify/getAlbum',
        {
            params: { albumId: queryKey[1] },
        }
    );
    return buildAlbum(data);
};

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IGetAlbum[]> => {
    const { data } = await axios.get('/api/spotify/getAlbums', {
        params: { albumIds: queryKey[1] },
    });
    return data;
};

export const getArtist = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IArtistDTO> => {
    const { data } = await axios.get('/api/spotify/getArtist', {
        params: { artistId: queryKey[1] },
    });
    return data;
};

interface IGetRecentlyPlayed {
    href: string;
    items: IRecentlyPlayedTrackDTO[];
    limit: number;
    next: string;
    cursors: {
        after: string;
    };
    total: number;
}

const buildRecentlyPlayed = (data: IGetRecentlyPlayed): IRecentlyPlayed => {
    const recentlyPlayed: ITrack[] = data.items.map((item) => {
        return {
            album: item.track.album,
            artists: item.track.artists,
            id: item.track.id,
            name: item.track.name,
            popularity: item.track.popularity,
            type: item.track.type,
            unique_id: appendUUID(item.track.id),
        };
    });
    return { items: recentlyPlayed };
};

export const getRecentlyPlayed = async (): Promise<IRecentlyPlayed> => {
    const { data }: { data: IGetRecentlyPlayed } = await axios.get(
        '/api/spotify/getRecentlyPlayed'
    );
    return buildRecentlyPlayed(data);
};

export interface IGetTopTracks {
    href: string;
    items: ITrackDTO[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}

const buildTopTracks = (data: IGetTopTracks): ITopTracks => {
    const topTracks: ITrack[] = data.items.map((item) => {
        return {
            album: item.album,
            artists: item.artists,
            id: item.id,
            name: item.name,
            popularity: item.popularity,
            type: item.type,
            unique_id: appendUUID(item.id),
        };
    });
    return { items: topTracks };
};

export const getTopTracks = async (): Promise<ITopTracks> => {
    const { data }: { data: IGetTopTracks } = await axios.get(
        '/api/spotify/getTopTracks'
    );
    return buildTopTracks(data);
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

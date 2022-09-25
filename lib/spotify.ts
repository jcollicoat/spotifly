import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbum,
    IArtist,
    IRecentlyPlayed,
    ITopTracks,
    ITrack,
} from '../lib/interfaces/spotify';
import { appendUUID, reduceArtists } from './helpers';

export interface ISpotifyImageDTO {
    height: number;
    url: string;
    width: number;
}

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

const buildAlbum = (data: IGetAlbum): IAlbum => ({
    album_type: data.album_type,
    artists: reduceArtists(data.artists),
    id: data.id,
    images: data.images,
    name: data.name,
    release_date: data.release_date,
    total_tracks: data.total_tracks,
    type: data.type,
    unique_id: appendUUID(data.id),
});

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

const buildAlbums = (data: IGetAlbum[]): IAlbum[] =>
    data.map((item) => ({
        album_type: item.album_type,
        artists: reduceArtists(item.artists),
        id: item.id,
        images: item.images,
        name: item.name,
        release_date: item.release_date,
        total_tracks: item.total_tracks,
        type: item.type,
        unique_id: appendUUID(item.id),
    }));

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum[]> => {
    const { data }: { data: IGetAlbum[] } = await axios.get(
        '/api/spotify/getAlbums',
        {
            params: { albumIds: queryKey[1] },
        }
    );
    return buildAlbums(data);
};

export interface IGetArtist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: [
        {
            url: string;
            height: number;
            width: number;
        }
    ];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

const buildArtist = (data: IGetArtist): IArtist => ({
    followers: data.followers.total,
    genres: data.genres,
    id: data.id,
    images: data.images,
    name: data.name,
    popularity: data.popularity,
    type: data.type,
    unique_id: appendUUID(data.id),
});

export const getArtist = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IArtist> => {
    const { data }: { data: IGetArtist } = await axios.get(
        '/api/spotify/getArtist',
        {
            params: { artistId: queryKey[1] },
        }
    );
    return buildArtist(data);
};

export interface IGetTrack {
    album: IAlbum;
    artists: IAlbumArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

const buildTrack = (data: IGetTrack): ITrack => ({
    album: data.album,
    artists: reduceArtists(data.artists),
    id: data.id,
    name: data.name,
    popularity: data.popularity,
    type: data.type,
    unique_id: appendUUID(data.id),
});

export const getTrack = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<ITrack> => {
    const { data }: { data: IGetTrack } = await axios.get(
        '/api/spotify/getTrack',
        {
            params: { trackId: queryKey[1] },
        }
    );
    return buildTrack(data);
};

export interface IRecentlyPlayedTrackDTO {
    context?: string;
    href: string;
    track: IGetTrack;
}

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

const buildRecentlyPlayed = (data: IGetRecentlyPlayed): IRecentlyPlayed => ({
    items: data.items.map((item) => buildTrack(item.track)),
});

export const getRecentlyPlayed = async (): Promise<IRecentlyPlayed> => {
    const { data }: { data: IGetRecentlyPlayed } = await axios.get(
        '/api/spotify/getRecentlyPlayed'
    );
    return buildRecentlyPlayed(data);
};

export interface IGetTopTracks {
    href: string;
    items: IGetTrack[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}

const buildTopTracks = (data: IGetTopTracks): ITopTracks => ({
    items: data.items.map((item) => ({
        album: item.album,
        artists: reduceArtists(item.artists),
        id: item.id,
        name: item.name,
        popularity: item.popularity,
        type: item.type,
        unique_id: appendUUID(item.id),
    })),
});

export const getTopTracks = async (): Promise<ITopTracks> => {
    const { data }: { data: IGetTopTracks } = await axios.get(
        '/api/spotify/getTopTracks'
    );
    return buildTopTracks(data);
};

export interface IGetUserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: true;
        filter_locked: true;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: [
        {
            url: string;
            height: number;
            width: number;
        }
    ];
    product: string;
    type: string;
    uri: string;
}

export const getUserProfile = async (): Promise<IGetUserProfile> => {
    const { data }: { data: IGetUserProfile } = await axios.get(
        '/api/spotify/getUserProfile'
    );
    return data;
};

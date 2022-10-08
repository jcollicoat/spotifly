import { ISpotifyImageDTO } from '../server/spotify-types';

export enum AlbumImageSize {
    small = 2,
    medium = 1,
    large = 0,
}

export interface IAlbumMinimum {
    id: string;
    key: string;
    name: string;
}

export interface IArtistMinimum {
    id: string;
    key: string;
    name: string;
}

export interface IAudioFeatures {
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: string;
    liveness: number;
    loudness: number;
    mode: 'Major' | 'Minor';
    music_key: string;
    speechiness: number;
    tempo: number;
    time_signature: string;
    valence: number;
}

export interface IAddonsTrack {
    audio_features: IAudioFeatures;
}

export interface IAlbum {
    album_type: string;
    artists: IArtistMinimum[];
    color: string;
    id: string;
    image: string;
    key: string;
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
}

export interface IArtist {
    followers: number;
    genres: string[];
    id: string;
    images: ISpotifyImageDTO[];
    key: string;
    name: string;
    popularity: number;
    type: string;
}

export interface ITrack {
    id: string;
    album: IAlbumMinimum;
    artists: IArtistMinimum[];
    audio_features?: IAudioFeatures;
    color: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
    addons?: IAddonsTrack;
}

export interface IRecentlyPlayed {
    items: ITrack[];
    limit?: number;
    next?: string | null;
    cursors?: {
        after: string;
    };
    total?: number;
}

export interface ITopAlbums {
    items: IAlbum[];
}

export interface ISmallListArtist {
    id: string;
    color: string;
    followers: number;
    genres: string[];
    image: string;
    key: string;
    name: string;
    popularity: number;
}

export interface ITopArtists<T> {
    artists: T[];
    next?: string | null;
    offset?: number;
    previous?: string | null;
    total?: number;
}

export interface ISmallListTrack {
    id: string;
    album: IAlbumMinimum;
    artists: IArtistMinimum[];
    audio_features?: IAudioFeatures;
    color: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
}

export interface ITopTracks {
    items: ITrack[];
    next?: string | null;
    offset?: number;
    previous?: string | null;
    total?: number;
}

export interface IUserProfile {
    country: string;
    display_name: string;
    followers: number;
    id: string;
    image: string;
    product: string;
    type: string;
}

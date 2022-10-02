import { ISpotifyImageDTO } from '../server/spotify-types';

export enum AlbumImageSize {
    small = 2,
    medium = 1,
    large = 0,
}

export interface IAlbumReduced {
    id: string;
    color: string;
    image: string;
    key: string;
    name: string;
    release_date: string;
}

export interface IArtistReduced {
    id: string;
    key: string;
    name: string;
}

export interface IAlbum {
    album_type: string;
    artists: IArtistReduced[];
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
    album: IAlbumReduced;
    artists: IArtistReduced[];
    color: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
}

export interface IRecentlyPlayed {
    items: ITrack[];
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

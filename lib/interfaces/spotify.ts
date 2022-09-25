import { ISpotifyImageDTO } from '../spotify';

export interface IAlbumReduced {
    id: string;
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
    id: string;
    images: ISpotifyImageDTO[];
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
    album: IAlbumReduced;
    artists: IArtistReduced[];
    id: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
}

export interface IRecentlyPlayed {
    items: ITrack[];
}

export interface ITopTracks {
    items: ITrack[];
}

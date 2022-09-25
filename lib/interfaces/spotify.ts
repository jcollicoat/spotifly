import { ISpotifyImageDTO } from '../spotify';

export interface IArtistReduced {
    id: string;
    name: string;
    unique_id: string;
}

export interface IAlbum {
    album_type: string;
    artists: IArtistReduced[];
    id: string;
    images: ISpotifyImageDTO[];
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
    unique_id: string;
}

export interface IArtist {
    followers: number;
    genres: string[];
    id: string;
    images: ISpotifyImageDTO[];
    name: string;
    popularity: number;
    type: string;
    unique_id: string;
}

export interface ITrack {
    album: IAlbum;
    artists: IArtistReduced[];
    id: string;
    name: string;
    popularity: number;
    type: string;
    unique_id: string;
}

export interface IRecentlyPlayed {
    items: ITrack[];
}

export interface ITopTracks {
    items: ITrack[];
}

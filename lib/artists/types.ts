import { IImageDTO } from '../_helpers/types';

export interface IArtist {
    id: string;
    color: string;
    followers: number;
    genres: string[];
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
}

export interface ITopArtists {
    artists: IArtist[];
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface IArtistAPI {
    id: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    images: IImageDTO[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ITopArtistsAPI {
    href: string;
    items: IArtistAPI[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

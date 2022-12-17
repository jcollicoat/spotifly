import { IImageDTO, IObjectDTO } from '../_helpers/types';
import { IGetAlbumArtistDTO } from '../albums/types';

// Client

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

// Server

export interface IGetArtistAPI {
    id: string;
    external_urls: IObjectDTO;
    followers: IObjectDTO;
    genres: string[];
    href: string;
    images: IImageDTO[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface IGetArtistsAPI {
    artists: IGetArtistAPI[];
}

export interface IGetArtistAlbums {
    href: string;
    items: {
        id: string;
        album_group: string;
        album_type: string;
        artists: IGetAlbumArtistDTO[];
        available_markets: string[];
        external_urls: IObjectDTO;
        href: string;
        images: IImageDTO[];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    }[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface ITopArtistsAPI {
    href: string;
    items: IGetArtistAPI[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

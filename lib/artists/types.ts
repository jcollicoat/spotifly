import { ImageDTO, ObjectDTO } from '../_helpers/types';
import { AlbumArtistDTO } from '../albums/types';

// Client

export interface Artist {
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

export interface TopArtists {
    artists: Artist[];
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

// Server

export interface ArtistDTO {
    id: string;
    external_urls: ObjectDTO;
    followers: ObjectDTO;
    genres: string[];
    href: string;
    images: ImageDTO[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ArtistsDTO {
    artists: ArtistDTO[];
}

export interface ArtistAlbumsDTO {
    href: string;
    items: {
        id: string;
        album_group: string;
        album_type: string;
        artists: AlbumArtistDTO[];
        available_markets: string[];
        external_urls: ObjectDTO;
        href: string;
        images: ImageDTO[];
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

export interface TopArtistsDTO {
    href: string;
    items: ArtistDTO[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

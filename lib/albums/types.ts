import { IImageDTO } from '../_helpers/types';
import { IAudioFeatures } from '../addons/types';

export interface IAlbumArtist {
    id: string;
    key: string;
    name: string;
}

export interface IAlbumTrack {
    id: string;
    artists: unknown[];
    duration_ms: number;
    explicit: boolean;
    name: string;
}

export interface IAlbum {
    id: string;
    key: string;
    album_type: string;
    artists: IAlbumArtist[];
    color: string;
    image: string;
    name: string;
    release_date: string;
    total_tracks: number;
    tracks: IAlbumTrack[];
    audio_features?: IAudioFeatures;
}

export interface IAlbumArtistDTO {
    id: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    name: string;
    type: 'artist';
    uri: string;
}

export interface IAlbumTrackDTO {
    id: string;
    artists: unknown[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    is_local: false;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface IAlbumAPI {
    id: string;
    album_type: string;
    artists: IAlbumArtistDTO[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    images: IImageDTO[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
        reason: string;
    };
    total_tracks: number;
    tracks: {
        href: string;
        items: IAlbumTrackDTO[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    type: string;
    uri: string;
}

export interface IAlbumsAPI {
    albums: IAlbumAPI[];
}

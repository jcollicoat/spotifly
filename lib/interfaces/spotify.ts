import { IAlbumArtistDTO } from '../spotify';

export interface ISpotifyImageDTO {
    height: number;
    url: string;
    width: number;
}

export interface IAlbum {
    album_type: string;
    artists: IAlbumArtistDTO[];
    id: string;
    images: ISpotifyImageDTO[];
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
    unique_id: string;
}

export interface ITrack {
    album: IAlbum;
    artists: IAlbumArtistDTO[];
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

export interface IArtistDTO {
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

export interface ITrackDTO {
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

export interface IRecentlyPlayedTrackDTO {
    context?: string;
    href: string;
    track: ITrackDTO;
}
export interface IUserProfileDTO {
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

export enum AlbumImageSize {
    small = 2,
    medium = 1,
    large = 0,
}

interface ISpotifyImageDTO {
    height: number;
    url: string;
    width: number;
}

export interface IItemArtistDTO {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface IAlbumDTO {
    album_type: string;
    artists: IItemArtistDTO[];
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
    album: IAlbumDTO;
    artists: IItemArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        ean: string;
        isrc: string;
        upc: string;
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

export interface IRecentlyPlayedDTO {
    href: string;
    items: IRecentlyPlayedTrackDTO[];
    limit: number;
    next: string;
    cursors: {
        after: string;
    };
    total: number;
}

export interface ITopTracksDTO {
    href: string;
    items: ITrackDTO[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
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

export interface IAlbumReduced {
    id: string;
    key: string;
    image: string;
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

export interface IUserProfile {
    country: string;
    display_name: string;
    followers: number;
    id: string;
    image: string;
    product: string;
    type: string;
}

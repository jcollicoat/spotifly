export interface ISpotifyImageDTO {
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

export interface IAlbumsDTO {
    albums: IAlbumDTO[];
}

export interface IArtistDTO {
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
    images: ISpotifyImageDTO[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface IAudioFeaturesAPI {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
}

export interface IAudioFeaturesListAPI {
    audio_features: IAudioFeaturesAPI[];
}

export interface IAddonsTracksAPI {
    audio_features?: IAudioFeaturesListAPI;
}

export interface ITrackAPI {
    id: string;
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
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface ITrackDTO extends ITrackAPI {
    audio_features?: IAudioFeaturesAPI;
}

export interface ITopAlbumsDTO {
    href: string;
    items: IAlbumDTO[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}

export interface ITopArtistsDTO {
    href: string;
    items: IArtistDTO[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
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

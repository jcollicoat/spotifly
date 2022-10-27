import {
    CheckSavedAPI,
    IAlbumMinimum,
    IArtistMinimum,
} from '../_helpers/types';
import {
    IAudioFeatures,
    IAudioFeaturesAPI,
    IAudioFeaturesListAPI,
} from '../addons/types';
import { IAlbumAPI } from '../albums/types';
import { ITopArtistsAPI } from '../artists/types';

// Client

export interface ITrack {
    id: string;
    album: IAlbumMinimum;
    artists: IArtistMinimum[];
    color: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
    audio_features?: IAudioFeatures;
}

interface ITracks {
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    audio_features?: IAudioFeatures;
}

export interface ITopTrackArtist extends IArtistMinimum {
    top_artist: boolean;
}

export interface ITopTrack extends ITrack {
    artists: ITopTrackArtist[];
    saved?: boolean;
}

export interface ITopTracks extends ITracks {
    items: ITopTrack[];
}

export interface IRecentlyPlayed {
    items: ITrack[];
    limit?: number;
    next?: string | null;
    cursors?: {
        after: string;
    };
    total?: number;
}

// Server

export interface ITrackAddonsDTO {
    audioFeaturesAPI: IAudioFeaturesAPI;
    topArtistsAPI: ITopArtistsAPI;
    checkSavedAPI: CheckSavedAPI;
}

export interface ITrackArtistDTO {
    id: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    name: string;
    type: string;
    uri: string;
}

export interface ITracksAddonsDTO {
    audioFeaturesAPI: IAudioFeaturesListAPI;
    topArtistsAPI: ITopArtistsAPI;
    checkSavedAPI: CheckSavedAPI;
}

export interface ITrackAPI {
    id: string;
    album: IAlbumAPI;
    artists: ITrackArtistDTO[];
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

interface IRecentlyPlayedTrackAPI {
    context?: string;
    href: string;
    track: ITrackAPI;
}

export interface IRecentlyPlayedAPI {
    href: string;
    items: IRecentlyPlayedTrackAPI[];
    limit: number;
    next: string | null;
    cursors: {
        after: string;
    };
    total: number;
}

export interface ITopTracksAPI {
    href: string;
    items: ITrackAPI[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

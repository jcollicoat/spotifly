import { ICheckSavedAPI, IAlbumMinimum, IObjectDTO } from '../_helpers/types';
import {
    IAudioFeatures,
    IGetAudioFeaturesAPI,
    IGetAudioFeaturesListAPI,
} from '../addons/types';
import { IGetAlbumAPI } from '../albums/types';
import { ITopArtistsAPI } from '../artists/types';

// Client

export interface ITrackArtist {
    id: string;
    key: string;
    name: string;
    top_artist: boolean;
}

export interface ITrack {
    id: string;
    album: IAlbumMinimum;
    artists: ITrackArtist[];
    color: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
    audio_features?: IAudioFeatures;
    saved?: boolean;
}

export type TopTracksMeta = {
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
};

export type RecentlyPlayedMeta = {
    limit: number;
    next: string | null;
    cursors: {
        after: string;
    };
    total: number;
};

export interface ITracks<TracksMeta> {
    items: ITrack[];
    meta: TracksMeta;
    audio_features?: IAudioFeatures;
}

// Server

export interface ITrackAddonsDTO {
    audioFeaturesAPI: IGetAudioFeaturesAPI;
    topArtistsAPI: ITopArtistsAPI;
    checkSavedAPI: ICheckSavedAPI;
}

export interface ITrackArtistDTO {
    id: string;
    external_urls: IObjectDTO;
    href: string;
    name: string;
    type: string;
    uri: string;
}

export interface ITracksAddonsDTO {
    audioFeaturesListAPI: IGetAudioFeaturesListAPI;
    topArtistsAPI: ITopArtistsAPI;
    checkSavedAPI: ICheckSavedAPI;
}

export interface IGetTrackAPI {
    id: string;
    album: IGetAlbumAPI;
    artists: ITrackArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: IObjectDTO;
    external_urls: IObjectDTO;
    href: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

interface IGetRecentlyPlayedTrack {
    context?: string;
    href: string;
    track: IGetTrackAPI;
}

export interface IGetRecentlyPlayedAPI {
    href: string;
    items: IGetRecentlyPlayedTrack[];
    limit: number;
    next: string | null;
    cursors: {
        after: string;
    };
    total: number;
}

export interface IGetTopTracksAPI {
    href: string;
    items: IGetTrackAPI[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

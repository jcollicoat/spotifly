import { CheckSavedDTO, AlbumMinimum, ObjectDTO } from '../_helpers/types';
import {
    AudioFeatures,
    AudioFeaturesDTO,
    AudioFeaturesListDTO,
} from '../addons/types';
import { AlbumDTO } from '../albums/types';
import { TopArtistsDTO } from '../artists/types';

// Client

export interface ITrackArtist {
    id: string;
    key: string;
    name: string;
    top_artist: boolean;
}

export interface ITrack {
    id: string;
    album: AlbumMinimum;
    artists: ITrackArtist[];
    color: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
    audio_features?: AudioFeatures;
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
    audio_features?: AudioFeatures;
}

// Server

export interface ITrackAddonsDTO {
    audioFeaturesAPI: AudioFeaturesDTO;
    topArtistsAPI: TopArtistsDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface ITrackArtistDTO {
    id: string;
    external_urls: ObjectDTO;
    href: string;
    name: string;
    type: string;
    uri: string;
}

export interface ITracksAddonsDTO {
    audioFeaturesListAPI: AudioFeaturesListDTO;
    topArtistsAPI: TopArtistsDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface IGetTrackAPI {
    id: string;
    album: AlbumDTO;
    artists: ITrackArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ObjectDTO;
    external_urls: ObjectDTO;
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

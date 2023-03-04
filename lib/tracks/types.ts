import { CheckSavedDTO, AlbumMinimum, ObjectDTO } from '../_helpers/types';
import {
    AudioFeatures,
    AudioFeaturesDTO,
    AudioFeaturesListDTO,
} from '../addons/types';
import { AlbumDTO } from '../albums/types';
import { TopArtistsDTO } from '../artists/types';

// Client

export interface TrackArtist {
    id: string;
    key: string;
    name: string;
    top_artist: boolean;
}

export interface Track {
    id: string;
    album: AlbumMinimum;
    artists: TrackArtist[];
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

export interface Tracks<TracksMeta> {
    items: Track[];
    meta: TracksMeta;
    audio_features?: AudioFeatures;
}

// Server

export interface TrackAddonsDTO {
    audioFeaturesAPI: AudioFeaturesDTO;
    topArtistsAPI: TopArtistsDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface TrackArtistDTO {
    id: string;
    external_urls: ObjectDTO;
    href: string;
    name: string;
    type: string;
    uri: string;
}

export interface TracksAddonsDTO {
    audioFeaturesListAPI: AudioFeaturesListDTO;
    topArtistsAPI: TopArtistsDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface TrackDTO {
    id: string;
    album: AlbumDTO;
    artists: TrackArtistDTO[];
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

interface RecentlyPlayedTrackDTO {
    context?: string;
    href: string;
    track: TrackDTO;
}

export interface RecentlyPlayedDTO {
    href: string;
    items: RecentlyPlayedTrackDTO[];
    limit: number;
    next: string | null;
    cursors: {
        after: string;
    };
    total: number;
}

export interface TopTracksDTO {
    href: string;
    items: TrackDTO[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

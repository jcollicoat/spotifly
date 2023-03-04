import { CheckSavedDTO, ImageDTO, ObjectDTO } from '../_helpers/types';
import {
    AudioFeatures,
    AudioFeaturesDTO,
    AudioFeaturesListDTO,
} from '../_addons/types';
import { TopArtistsDTO } from '../artists/types';
import { Track, TrackDTO } from '../tracks/types';

// Client

export interface AlbumArtist {
    id: string;
    key: string;
    name: string;
    top_artist: boolean;
}

export type AlbumTrack = Omit<
    Track,
    'album' | 'artists' | 'color' | 'image' | 'popularity'
>;

export interface Album {
    id: string;
    key: string;
    album_type: string;
    artists: AlbumArtist[];
    color: string;
    image: string;
    name: string;
    release_date: string;
    total_tracks: number;
    tracks: AlbumTrack[];
    audio_features?: AudioFeatures;
}

// Server

export interface AlbumAddonsDTO {
    audioFeaturesListAPI: AudioFeaturesListDTO;
    topArtistsAPI: TopArtistsDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface AlbumTrackAddonsDTO {
    audioFeaturesAPI: AudioFeaturesDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface AlbumArtistDTO {
    id: string;
    external_urls: ObjectDTO;
    href: string;
    name: string;
    type: string;
    uri: string;
}

interface AlbumCopyrightsDTO {
    text: string;
    type: string;
}

export type AlbumTrackDTO = Omit<
    TrackDTO,
    'album' | 'external_ids' | 'popularity'
>;

export interface AlbumDTO {
    id: string;
    album_type: string;
    artists: AlbumArtistDTO[];
    available_markets: string[];
    copyrights: AlbumCopyrightsDTO[];
    external_ids: ObjectDTO;
    external_urls: ObjectDTO;
    genres: string[];
    href: string;
    images: ImageDTO[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    restrictions?: ObjectDTO;
    total_tracks: number;
    tracks: {
        href: string;
        items: AlbumTrackDTO[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
    type: string;
    uri: string;
}

export interface AlbumsAddonsDTO {
    addonSets: {
        addons: AlbumAddonsDTO;
        id: string;
    }[];
}

export interface AlbumsDTO {
    albums: AlbumDTO[];
}

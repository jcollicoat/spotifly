import { CheckSavedDTO, ImageDTO, ObjectDTO } from '../_helpers/types';
import {
    AudioFeatures,
    AudioFeaturesDTO,
    AudioFeaturesListDTO,
} from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { ITrack, IGetTrackAPI } from '../tracks/types';

// Client

export interface IAlbumArtist {
    id: string;
    key: string;
    name: string;
    top_artist: boolean;
}

export type IAlbumTrack = Omit<
    ITrack,
    'album' | 'artists' | 'color' | 'image' | 'popularity'
>;

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
    audio_features?: AudioFeatures;
}

// Server

export interface IAlbumAddonsDTO {
    audioFeaturesListAPI: AudioFeaturesListDTO;
    topArtistsAPI: ITopArtistsAPI;
    checkSavedAPI: CheckSavedDTO;
}

export interface IAlbumTrackAddonsDTO {
    audioFeaturesAPI: AudioFeaturesDTO;
    checkSavedAPI: CheckSavedDTO;
}

export interface IGetAlbumArtistDTO {
    id: string;
    external_urls: ObjectDTO;
    href: string;
    name: string;
    type: string;
    uri: string;
}

interface IGetAlbumCopyrightsDTO {
    text: string;
    type: string;
}

export type IGetAlbumTrackDTO = Omit<
    IGetTrackAPI,
    'album' | 'external_ids' | 'popularity'
>;

export interface IGetAlbumAPI {
    id: string;
    album_type: string;
    artists: IGetAlbumArtistDTO[];
    available_markets: string[];
    copyrights: IGetAlbumCopyrightsDTO[];
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
        items: IGetAlbumTrackDTO[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
    type: string;
    uri: string;
}

export interface IAlbumsAddonsDTO {
    addonSets: {
        addons: IAlbumAddonsDTO;
        id: string;
    }[];
}

export interface IGetAlbumsAPI {
    albums: IGetAlbumAPI[];
}

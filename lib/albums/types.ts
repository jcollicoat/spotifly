import { ICheckSavedAPI, IImageDTO, IObject } from '../_helpers/types';
import {
    IAudioFeatures,
    IAudioFeaturesAPI,
    IAudioFeaturesListAPI,
} from '../addons/types';
import { ITopArtistsAPI } from '../artists/types';
import { ITrack, ITrackAPI } from '../tracks/types';

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
    audio_features?: IAudioFeatures;
}

// Server

export interface IAlbumAddonsDTO {
    audioFeaturesAPI: IAudioFeaturesListAPI;
    topArtistsAPI: ITopArtistsAPI;
    checkSavedAPI: CheckSavedAPI;
}

export interface IAlbumTrackAddonsDTO {
    audioFeaturesAPI: IAudioFeaturesAPI;
    checkSavedAPI: ICheckSavedAPI;
}

export interface IAlbumArtistDTO {
    id: string;
    external_urls: IObject;
    href: string;
    name: string;
    type: string;
    uri: string;
}

interface IAlbumCopyrightsDTO {
    text: string;
    type: string;
}

export type IAlbumTrackDTO = Omit<
    ITrackAPI,
    'album' | 'external_ids' | 'popularity'
>;

export interface IAlbumAPI {
    id: string;
    album_type: string;
    artists: IAlbumArtistDTO[];
    available_markets: string[];
    copyrights: IAlbumCopyrightsDTO[];
    external_ids: IObject;
    external_urls: IObject;
    genres: string[];
    href: string;
    images: IImageDTO[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    restrictions?: IObject;
    total_tracks: number;
    tracks: {
        href: string;
        items: IAlbumTrackDTO[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
    type: string;
    uri: string;
}

export interface IAlbumsAPI {
    albums: IAlbumAPI[];
}

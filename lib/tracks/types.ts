import { IAlbumMinimum, IArtistMinimum } from '../_helpers/types';
import { IAudioFeatures, IAddonsTrack } from '../addons/types';
import { IAlbumAPI } from '../albums/types';

export interface ITrack {
    id: string;
    album: IAlbumMinimum;
    artists: IArtistMinimum[];
    audio_features?: IAudioFeatures;
    color: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
    addons?: IAddonsTrack;
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

export interface ITopTracks {
    items: ITrack[];
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface ITrackArtistDTO {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
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

import { IAlbumMinimum, IArtistMinimum } from '../_helpers/types';
import { IAudioFeatures, IAddonsTrack } from '../addons/types';

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

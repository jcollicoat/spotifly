import { IAlbumMinimum, IArtistMinimum } from './_simple';
import { IAddonsTrack, IAudioFeatures } from './addons';

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

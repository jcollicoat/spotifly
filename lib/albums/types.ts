import { ITrackAPI } from '../../pages/api/spotify/getTrack';
import { IArtistMinimum, IImageDTO } from '../_helpers/types';
import { IAudioFeatures } from '../addons/types';
import { IArtistAPI } from '../artists/types';

export interface IAlbum {
    id: string;
    album_type: string;
    artists: IArtistMinimum[];
    color: string;
    image: string;
    key: string;
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
    audio_features?: IAudioFeatures;
}

export interface ITopAlbums {
    items: IAlbum[];
}

export interface IAlbumAPI {
    album_type: string;
    artists: IArtistAPI[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: IImageDTO[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
        reason: string;
    };
    total_tracks: number;
    tracks: {
        href: string;
        items: ITrackAPI[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    type: string;
    uri: string;
}

export interface IAlbumsAPI {
    albums: IAlbumAPI[];
}

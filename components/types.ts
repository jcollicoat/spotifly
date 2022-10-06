import { IAlbum, ISmallListArtist, ITrack } from '../lib/client/spotify-types';

export type SkeletonStates = 'error' | 'warning';

export interface ISkeleton {
    data?: never;
    state?: SkeletonStates; // None treated as loading
}

interface IData<T> {
    data: T;
    state?: never;
}

export type IComponent<T> = ISkeleton | IData<T>;

export interface ICreatePanel {
    isSkeleton?: true;
}

export interface IAlbumComponentBase {
    album: Pick<IAlbum, 'id' | 'artists' | 'color' | 'image' | 'name'>;
}

export interface IArtistComponentBase {
    artist: ISmallListArtist;
}

export interface ITrackComponentBase {
    track: Pick<
        ITrack,
        | 'id'
        | 'album'
        | 'artists'
        | 'audio_features'
        | 'color'
        | 'image'
        | 'name'
    >;
}

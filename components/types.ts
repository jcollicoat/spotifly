import { ITrack } from '../lib/spotify-types';

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

export interface ITrackComponentBase {
    track: Pick<ITrack, 'album' | 'artists' | 'id' | 'name'>;
}

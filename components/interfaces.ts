export type SkeletonStates = 'error' | 'warning';

export interface ISkeleton {
    data?: never;
    state?: SkeletonStates; // None treated as loading
}

interface ILoaded<T> {
    data: T;
    state?: never;
}

export type IComponent<T> = ISkeleton | ILoaded<T>;

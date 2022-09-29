export interface ISkeleton {
    state?: 'error' | 'warning'; // None treated as loading
    data?: never;
}

interface ILoaded<T> {
    data: T;
    state?: never;
}

export type IComponent<T> = ISkeleton | ILoaded<T>;

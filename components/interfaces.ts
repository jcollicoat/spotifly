interface ISkeleton {
    state: 'loading' | 'error';
    data?: never;
}

interface ILoaded<T> {
    data: T;
    state?: never;
}

export type IComponent<T> = ISkeleton | ILoaded<T>;

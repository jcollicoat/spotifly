// Client

export enum ImageSize {
    small = 2,
    medium = 1,
    large = 0,
}

export interface AlbumMinimum {
    id: string;
    key: string;
    name: string;
}

export interface ArtistMinimum {
    id: string;
    key: string;
    name: string;
}

// Server

export type CheckSavedDTO = boolean[];

export interface ImageDTO {
    height: number;
    width: number;
    url: string;
}

export interface ObjectDTO {
    [key: string]: string;
}

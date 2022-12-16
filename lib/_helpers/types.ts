export type ICheckSavedAPI = boolean[];

export enum ImageSize {
    small = 2,
    medium = 1,
    large = 0,
}

export interface IAlbumMinimum {
    id: string;
    key: string;
    name: string;
}

export interface IArtistMinimum {
    id: string;
    key: string;
    name: string;
}

export interface IImageDTO {
    height: number;
    width: number;
    url: string;
}

export interface IObject {
    [key: string]: string;
}

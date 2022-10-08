import { IArtistMinimum } from './_simple';

export interface IAlbum {
    album_type: string;
    artists: IArtistMinimum[];
    color: string;
    id: string;
    image: string;
    key: string;
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
}

export interface ITopAlbums {
    items: IAlbum[];
}

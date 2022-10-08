import { IImageDTO, IItemArtistDTO } from './_simple';

export interface IAlbumDTO {
    album_type: string;
    artists: IItemArtistDTO[];
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
    total_tracks: number;
    type: string;
    uri: string;
}

export interface IAlbumsDTO {
    albums: IAlbumDTO[];
}

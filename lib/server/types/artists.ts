import { IImageDTO } from './_simple';

export interface IArtistDTO {
    id: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    images: IImageDTO[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

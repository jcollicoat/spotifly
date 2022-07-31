import { IAlbumArtDTO } from './IAlbumArtDTO';
import { IArtistDTO } from './IArtistDTO';

export interface IAlbumDTO {
    album_type: string;
    artists: IArtistDTO[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: IAlbumArtDTO[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

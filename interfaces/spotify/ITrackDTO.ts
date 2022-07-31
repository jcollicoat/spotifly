import { IAlbumDTO } from './IAlbumDTO';
import { IArtistDTO } from './IArtistDTO';

export interface ITrackDTO {
    album: IAlbumDTO;
    artists: IArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

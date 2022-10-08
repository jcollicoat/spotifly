import { IAlbumAPI } from '../../../pages/api/spotify/getAlbum';
import { IItemArtistDTO } from './_simple';

export interface ITrackDTO {
    id: string;
    album: IAlbumAPI;
    artists: IItemArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        ean: string;
        isrc: string;
        upc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

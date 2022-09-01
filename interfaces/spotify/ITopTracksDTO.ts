import { ITrackDTO } from './ITrackDTO';

export interface ITopTracksDTO {
    href: string;
    items: ITrackDTO[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}

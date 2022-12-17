import { v4 as uuidv4 } from 'uuid';
import { IGetAlbumAPI } from '../albums/types';
import { IGetArtistAPI } from '../artists/types';
import { ITrackArtistDTO } from '../tracks/types';
import { IAlbumMinimum, IArtistMinimum } from './types';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const reduceAlbum = (album: IGetAlbumAPI): IAlbumMinimum => {
    return {
        id: album.id,
        key: appendUUID(album.id),
        name: album.name,
    };
};

export const reduceArtists = (
    artists: IGetArtistAPI[] | ITrackArtistDTO[]
): IArtistMinimum[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

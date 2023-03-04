import { v4 as uuidv4 } from 'uuid';
import { AlbumDTO } from '../albums/types';
import { ArtistDTO } from '../artists/types';
import { ITrackArtistDTO } from '../tracks/types';
import { AlbumMinimum, ArtistMinimum } from './types';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const reduceAlbum = (album: AlbumDTO): AlbumMinimum => {
    return {
        id: album.id,
        key: appendUUID(album.id),
        name: album.name,
    };
};

export const reduceArtists = (
    artists: ArtistDTO[] | ITrackArtistDTO[]
): ArtistMinimum[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

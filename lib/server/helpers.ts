import { v4 as uuidv4 } from 'uuid';
import { IArtistReduced } from '../client/spotify-types';
import { IItemArtistDTO } from './spotify-types';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const reduceItemArtists = (
    artists: IItemArtistDTO[]
): IArtistReduced[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

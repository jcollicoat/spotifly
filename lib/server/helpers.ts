import { v4 as uuidv4 } from 'uuid';
import { IArtistReduced, IItemArtistDTO } from '../client/spotify-types';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const reduceItemArtists = (
    artists: IItemArtistDTO[]
): IArtistReduced[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

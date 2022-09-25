import { v4 as uuidv4 } from 'uuid';
import { IArtistReduced } from './interfaces/spotify';
import { IAlbumArtistDTO } from './spotify';

export const appendUUID = (id: string): string => {
    const uuid = uuidv4();
    return `${id}-${uuid}`;
};

export const reduceArtists = (artists: IAlbumArtistDTO[]): IArtistReduced[] => {
    const albumArtists: IArtistReduced[] = artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));
    return albumArtists;
};

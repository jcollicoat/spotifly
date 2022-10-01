import { v4 as uuidv4 } from 'uuid';
import {
    IItemArtistDTO,
    IAlbumReduced,
    IArtistReduced,
    IAlbumDTO,
    AlbumImageSize,
} from './types/spotify';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const reduceAlbum = (
    album: IAlbumDTO,
    imageSize?: AlbumImageSize
): IAlbumReduced => ({
    id: album.id,
    image: album.images[imageSize ?? 2].url,
    key: appendUUID(album.id),
    name: album.name,
    release_date: album.release_date,
});

export const reduceItemArtists = (
    artists: IItemArtistDTO[]
): IArtistReduced[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

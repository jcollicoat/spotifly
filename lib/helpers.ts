import { FastAverageColor } from 'fast-average-color';
import { v4 as uuidv4 } from 'uuid';
import {
    IItemArtistDTO,
    IAlbumReduced,
    IArtistReduced,
    IAlbumDTO,
    AlbumImageSize,
} from './types/spotify';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const reduceAlbum = async (
    album: IAlbumDTO,
    imageSize?: AlbumImageSize
): Promise<IAlbumReduced> => {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(album.images[2].url);
    return {
        id: album.id,
        color: color.hex,
        image: album.images[imageSize ?? 2].url,
        key: appendUUID(album.id),
        name: album.name,
        release_date: album.release_date,
    };
};

export const reduceItemArtists = (
    artists: IItemArtistDTO[]
): IArtistReduced[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

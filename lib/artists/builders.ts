import { IArtistAPI, buildArtist } from '../../pages/api/spotify/getArtist';
import { ImageSize } from '../_helpers/types';
import { IArtist } from './types';

export const buildArtists = async (
    artists: IArtistAPI[],
    imageSize?: ImageSize
): Promise<IArtist[]> => {
    return await Promise.all(
        artists.map(async (artist) => await buildArtist(artist, imageSize))
    );
};

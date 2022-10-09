import { getAverageColor } from 'fast-average-color-node';
import { ImageSize } from '../_helpers/types';
import { appendUUID } from '../server/helpers';
import { IArtist, IArtistAPI } from './types';

export const buildArtist = async (
    artistAPI: IArtistAPI,
    imageSize?: ImageSize
): Promise<IArtist> => {
    const color = await getAverageColor(artistAPI.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${artistAPI.id} (${artistAPI.name}).`
        );
    }

    return {
        id: artistAPI.id,
        color: color.hex,
        followers: artistAPI.followers.total,
        genres: artistAPI.genres,
        image: artistAPI.images[imageSize ?? 2].url,
        key: appendUUID(artistAPI.id),
        name: artistAPI.name,
        popularity: artistAPI.popularity,
        type: artistAPI.type,
    };
};

export const buildArtists = async (
    artists: IArtistAPI[],
    imageSize?: ImageSize
): Promise<IArtist[]> => {
    return await Promise.all(
        artists.map(async (artist) => await buildArtist(artist, imageSize))
    );
};

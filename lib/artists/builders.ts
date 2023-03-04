import { getAverageColor } from 'fast-average-color-node';
import { appendUUID } from '../_helpers/helpers';
import { ImageSize } from '../_helpers/types';
import { AddonsDTO } from '../_addons/types';
import { Artist, ArtistDTO, TopArtists, TopArtistsDTO } from './types';

export const buildArtist = async (
    artistAPI: ArtistDTO,
    imageSize?: ImageSize
): Promise<Artist> => {
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
    artists: ArtistDTO[],
    imageSize?: ImageSize
): Promise<Artist[]> => {
    return await Promise.all(
        artists.map(async (artist) => await buildArtist(artist, imageSize))
    );
};

export const buildTopArtists = async (
    data: TopArtistsDTO,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addons?: AddonsDTO
): Promise<TopArtists> => ({
    artists: await buildArtists(data.items),
    next: data.next,
    offset: data.offset,
    previous: data.previous,
    total: data.total,
});

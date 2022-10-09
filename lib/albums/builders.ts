import { getAverageColor } from 'fast-average-color-node';
import { reduceArtists } from '../_helpers/helpers';
import { ImageSize } from '../_helpers/types';
import { averageAudioFeaturesList } from '../addons/builders';
import { IAddonsAlbum, IAddonsAlbumDTO } from '../addons/types';
import { appendUUID } from '../server/helpers';
import { IAlbum, IAlbumAPI } from './types';

export const buildAlbum = async (
    albumAPI: IAlbumAPI,
    addons?: IAddonsAlbumDTO,
    imageSize?: ImageSize
): Promise<IAlbum> => {
    const color = await getAverageColor(albumAPI.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${albumAPI.id} (${albumAPI.name}).`
        );
    }

    const builtAddons: IAddonsAlbum = {
        audio_features:
            addons?.audio_features &&
            averageAudioFeaturesList(addons.audio_features),
    };

    return {
        id: albumAPI.id,
        album_type: albumAPI.album_type,
        artists: reduceArtists(albumAPI.artists),
        color: color.hex,
        image: albumAPI.images[imageSize ?? 2].url,
        key: appendUUID(albumAPI.id),
        name: albumAPI.name,
        release_date: albumAPI.release_date,
        total_tracks: albumAPI.total_tracks,
        type: albumAPI.type,
        ...builtAddons,
    };
};

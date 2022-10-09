import { getAverageColor } from 'fast-average-color-node';
import { appendUUID, reduceArtists } from '../_helpers/helpers';
import { ImageSize } from '../_helpers/types';
import { buildAudioFeaturesListToSingle } from '../addons/builders';
import { IAddonsAlbum, IAddonsDTO } from '../addons/types';
import { IAlbum, IAlbumAPI, IAlbumsAPI } from './types';

export const buildAlbum = async (
    albumAPI: IAlbumAPI,
    addons?: IAddonsDTO,
    imageSize?: ImageSize
): Promise<IAlbum> => {
    const color = await getAverageColor(albumAPI.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${albumAPI.id} (${albumAPI.name}).`
        );
    }

    let builtAddons: IAddonsAlbum | undefined = undefined;
    if (addons) {
        builtAddons = {
            audio_features: addons.audio_features
                ? buildAudioFeaturesListToSingle(addons.audio_features)
                : undefined,
        };
    }

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

export const buildAlbums = async (
    albumsAPI: IAlbumsAPI,
    addons?: IAddonsDTO,
    imageSize?: ImageSize
): Promise<IAlbum[]> => {
    return await Promise.all(
        albumsAPI.albums.map(
            async (albumAPI) => await buildAlbum(albumAPI, addons, imageSize)
        )
    );
};

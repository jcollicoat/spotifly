/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageSize } from '../../../lib/client/types/_simple';
import { IAlbum } from '../../../lib/client/types/albums';
import { determineAccessToken } from '../../../lib/server/auth';
import { handleError } from '../../../lib/server/helpers';
import { buildAlbum, IAlbumAPI } from './getAlbum';

const endpoint = 'https://api.spotify.com/v1/albums';

export interface IAlbumsAPI {
    albums: IAlbumAPI[];
}

const buildAlbums = async (
    albumsAPI: IAlbumsAPI,
    imageSize?: ImageSize
): Promise<IAlbum[]> => {
    return await Promise.all(
        albumsAPI.albums.map(
            async (albumAPI) => await buildAlbum(albumAPI, imageSize)
        )
    );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const albumIDs = req.query.albumIDs?.toString();
        const albumsAPI = await axios.get<IAlbumsAPI>(endpoint, {
            headers: {
                Authorization: access_token,
            },
            params: {
                ids: albumIDs,
            },
        });

        const builtAlbums = await buildAlbums(albumsAPI.data);

        res.status(200).json(builtAlbums);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

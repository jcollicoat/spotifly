/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../lib/_helpers/server';
import { getAlbumsAddons } from '../../lib/albums/addons';
import { buildAlbums } from '../../lib/albums/builders';
import { IAlbumsAddonsDTO, IGetAlbumsAPI } from '../../lib/albums/types';
import { determineAccessToken } from '../../lib/auth/server';

const endpoint = 'https://api.spotify.com/v1/albums';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const albumIDs = req.query.albumIDs?.toString();
        const albumsAPI = await axios.get<IGetAlbumsAPI>(endpoint, {
            headers: {
                Authorization: access_token,
            },
            params: {
                ids: albumIDs,
            },
        });

        if (req.query.addons === 'true') {
            try {
                const trackIDsByAlbum = albumsAPI.data.albums.map((album) => ({
                    albumID: album.id,
                    trackIDs: album.tracks.items.map((track) => track.id),
                }));
                const addons: IAlbumsAddonsDTO = await getAlbumsAddons(
                    access_token,
                    trackIDsByAlbum
                );

                const builtAlbums = await buildAlbums(albumsAPI.data, addons);

                res.status(200).json(builtAlbums);
            } catch (error) {
                const { status, message } = handleError(error);
                console.warn({
                    summary: 'Error fetching albums addons.',
                    status: status,
                    message: message,
                });

                const builtAlbums = await buildAlbums(albumsAPI.data);

                res.status(200).json(builtAlbums);
            }
        } else {
            const builtAlbums = await buildAlbums(albumsAPI.data);

            res.status(200).json(builtAlbums);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

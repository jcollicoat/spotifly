/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EPAlbum } from '../../lib/_helpers/endpoints';
import { handleError } from '../../lib/_helpers/server';
import { getAlbumAddons } from '../../lib/albums/addons';
import { buildAlbum } from '../../lib/albums/builders';
import { AlbumAddonsDTO, AlbumDTO } from '../../lib/albums/types';
import { determineAccessToken } from '../../lib/auth/server';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const albumID = req.query.albumID;
        const albumAPI = await axios.get<AlbumDTO>(EPAlbum + albumID, {
            headers: {
                Authorization: access_token,
            },
        });

        if (req.query.addons === 'true') {
            try {
                const addons: AlbumAddonsDTO = await getAlbumAddons(
                    access_token,
                    albumAPI.data
                );

                const builtAlbum = await buildAlbum(albumAPI.data, addons);

                res.status(200).json(builtAlbum);
            } catch (error) {
                const { status, message } = handleError(error);
                console.warn({
                    summary: `Error fetching album addons: ${albumAPI.data.id}`,
                    status: status,
                    message: message,
                });

                const builtAlbum = await buildAlbum(albumAPI.data);

                res.status(200).json(builtAlbum);
            }
        } else {
            const builtAlbum = await buildAlbum(albumAPI.data);

            res.status(200).json(builtAlbum);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

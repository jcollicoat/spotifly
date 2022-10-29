/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../lib/_helpers/server';
import { getAlbumAddons } from '../../lib/albums/addons';
import { buildAlbum } from '../../lib/albums/builders';
import { IAlbumAddonsDTO, IAlbumAPI } from '../../lib/albums/types';
import { determineAccessToken } from '../../lib/auth/server';

const endpoint = 'https://api.spotify.com/v1/albums/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const albumID = req.query.albumID;
        const albumAPI = await axios.get<IAlbumAPI>(endpoint + albumID, {
            headers: {
                Authorization: access_token,
            },
        });

        if (req.query.addons === 'true') {
            try {
                const trackIDs = albumAPI.data.tracks.items
                    .map((track) => track.id)
                    .join(',');
                const addons: IAlbumAddonsDTO = await getAlbumAddons(
                    access_token,
                    trackIDs
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

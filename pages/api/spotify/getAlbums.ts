/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IAddonsDTO } from '../../../lib/addons/types';
import { buildAlbums } from '../../../lib/albums/builders';
import { IAlbumsAPI } from '../../../lib/albums/types';
import { determineAccessToken } from '../../../lib/server/auth';
import { handleError } from '../../../lib/server/helpers';

const endpoint = 'https://api.spotify.com/v1/albums';

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

        try {
            // Fetch addons here

            const addons: IAddonsDTO[] | undefined = undefined;

            const builtAlbums = await buildAlbums(albumsAPI.data, addons);

            res.status(200).json(builtAlbums);
        } catch (error) {
            const { status, message } = handleError(error);
            console.warn({
                summary: 'Error fetching albums addons.',
                status: status,
                message: message,
            });

            const builtTopTracks = await buildAlbums(albumsAPI.data);

            res.status(200).json(builtTopTracks);
        }

        const builtAlbums = await buildAlbums(albumsAPI.data);

        res.status(200).json(builtAlbums);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

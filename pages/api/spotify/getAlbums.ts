/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildAlbums } from '../../../lib/server/spotify';
import { IAlbumsDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/albums';

const getAlbums = async (
    req: NextApiRequest
): Promise<AxiosResponse<IAlbumsDTO> | null> => {
    const albumIds = req.query.albumIds?.toString();

    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    const api = await axios.get<IAlbumsDTO>(endpoint, {
        headers: {
            Authorization: access_token,
        },
        params: {
            ids: albumIds,
        },
    });

    return api;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getAlbums(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildAlbums(api.data);
        res.status(200).json(built);
    }
};

export default handler;

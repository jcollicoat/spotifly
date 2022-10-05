/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildRecentlyPlayed } from '../../../lib/server/spotify';
import { IRecentlyPlayedDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me/player/recently-played';

const getRecentlyPlayed = async (
    req: NextApiRequest
): Promise<AxiosResponse<IRecentlyPlayedDTO> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    const limit = req.query.limit ? Number(req.query.limit) : 20;
    return await axios.get<IRecentlyPlayedDTO>(endpoint, {
        headers: {
            Authorization: access_token,
        },
        params: {
            limit: limit,
        },
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getRecentlyPlayed(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildRecentlyPlayed(api.data);
        res.status(200).json(built);
    }
};

export default handler;

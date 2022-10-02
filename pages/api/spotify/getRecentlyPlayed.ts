/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { buildRecentlyPlayed } from '../../../lib/server/spotify';
import { IRecentlyPlayedDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me/player/recently-played';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;
        const limit =
            typeof req.query.limit === 'string' ? Number(req.query.limit) : 20;

        const response: AxiosResponse<IRecentlyPlayedDTO> = await axios.get(
            endpoint,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                params: {
                    limit: limit,
                },
            }
        );
        const built = await buildRecentlyPlayed(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

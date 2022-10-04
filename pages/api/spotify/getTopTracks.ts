/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { buildTopTracks } from '../../../lib/server/spotify';

const ENV = process.env.ENV;

const endpoint = 'https://api.spotify.com/v1/me/top/tracks';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session && ENV === 'local') {
        const accessTokenWithPrefix = req.rawHeaders[1];

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: accessTokenWithPrefix,
            },
        });
        const built = await buildTopTracks(response.data);

        res.status(response.status).json(built);
    } else if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = await buildTopTracks(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

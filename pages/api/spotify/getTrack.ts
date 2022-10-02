/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { buildTrack } from '../../../lib/server/spotify';

const endpoint = 'https://api.spotify.com/v1/tracks/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const trackId = req.query.trackId;

    if (typeof trackId !== 'string') {
        res.status(400).send(`Bad trackID supplied: ${trackId}`);
    } else if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint + trackId, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = await buildTrack(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

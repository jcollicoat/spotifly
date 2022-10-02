/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { buildAlbum } from '../../../lib/server/spotify';

const endpoint = 'https://api.spotify.com/v1/albums/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const albumId = req.query.albumId;

    if (typeof albumId !== 'string') {
        res.status(400).send(`Bad albumID supplied: ${albumId}`);
    } else if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint + albumId, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = buildAlbum(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

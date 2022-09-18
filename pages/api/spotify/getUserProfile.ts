/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const endpoint = 'https://api.spotify.com/v1/me';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
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

        res.status(response.status).json(response.data);
    }
};

export default handler;

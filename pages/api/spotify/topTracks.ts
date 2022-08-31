/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getAccessToken } from '../../../lib/spotify/getAccessToken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const endpoint = 'https://api.spotify.com/v1/me/top/tracks';
    const session = await getSession({ req });

    if (!session) {
        res.status(403).send('Not logged in');
    } else {
        const { access_token } = await getAccessToken(
            session.refresh_token as string
        );

        const { data } = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        res.status(200).json(data);
    }
};

export default handler;

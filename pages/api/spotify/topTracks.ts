/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '../../../lib/spotify/getAccessToken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const endpoint = 'https://api.spotify.com/v1/me/top/tracks';
    const { access_token } = await getAccessToken();

    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const { data } = response;

    res.status(200).json({ data });
};

export default handler;

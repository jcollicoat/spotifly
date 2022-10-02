/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
    IRecentlyPlayedDTO,
    IRecentlyPlayed,
} from '../../../lib/types/spotify';
import { buildTracks } from './getTrack';

const endpoint = 'https://api.spotify.com/v1/me/player/recently-played';

const buildRecentlyPlayed = async (
    data: IRecentlyPlayedDTO
): Promise<IRecentlyPlayed> => ({
    items: await buildTracks(data.items.map((item) => item.track)),
});

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
        console.log(limit);

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

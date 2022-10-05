/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { buildTopTracks } from '../../../lib/server/spotify';
import { ITopTracksDTO } from '../../../lib/server/spotify-types';

const ENV = process.env.ENV;

const endpoint = 'https://api.spotify.com/v1/me/top/tracks';

const getTopTracks = async (
    req: NextApiRequest
): Promise<AxiosResponse<ITopTracksDTO> | null> => {
    const session = await getSession({ req });

    let access_token: string;
    if (session) {
        access_token = `Bearer ${session.access_token}`;
    } else if (ENV === 'local' && req.rawHeaders[1].match(/Bearer /g)) {
        // Header Prefix in Postmand Auth
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        access_token = req.rawHeaders[1];
    } else {
        return null;
    }

    const api = await axios.get<ITopTracksDTO>(endpoint, {
        headers: {
            Authorization: access_token,
        },
    });

    return api;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getTopTracks(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildTopTracks(api.data);
        res.status(200).json(built);
    }
};

export default handler;

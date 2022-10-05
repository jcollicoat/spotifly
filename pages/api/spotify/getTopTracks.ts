/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildTopTracks } from '../../../lib/server/spotify';
import { ITopTracksDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me/top/tracks';

const getTopTracks = async (
    req: NextApiRequest
): Promise<AxiosResponse<ITopTracksDTO> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    return await axios.get<ITopTracksDTO>(endpoint, {
        headers: {
            Authorization: access_token,
        },
    });
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

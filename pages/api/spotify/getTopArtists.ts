/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildTopArtists } from '../../../lib/server/spotify';
import { ITopArtistsDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me/top/artists';

const getTopArtists = async (
    req: NextApiRequest
): Promise<AxiosResponse<ITopArtistsDTO> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    return await axios.get<ITopArtistsDTO>(endpoint, {
        headers: {
            Authorization: access_token,
        },
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getTopArtists(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildTopArtists(api.data);
        res.status(200).json(built);
    }
};

export default handler;

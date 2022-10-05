/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildAlbum } from '../../../lib/server/spotify';
import { IAlbumDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/albums/';

const getAlbum = async (
    req: NextApiRequest
): Promise<AxiosResponse<IAlbumDTO> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    const albumId = req.query.albumId;
    return await axios.get<IAlbumDTO>(endpoint + albumId, {
        headers: {
            Authorization: access_token,
        },
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getAlbum(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildAlbum(api.data);
        res.status(200).json(built);
    }
};

export default handler;

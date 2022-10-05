/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildArtist } from '../../../lib/server/spotify';
import { IArtistDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/artists/';

const getArtist = async (
    req: NextApiRequest
): Promise<AxiosResponse<IArtistDTO> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    const artistId = req.query.artistId;
    return await axios.get<IArtistDTO>(endpoint + artistId, {
        headers: {
            Authorization: access_token,
        },
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getArtist(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildArtist(api.data);
        res.status(200).json(built);
    }
};

export default handler;

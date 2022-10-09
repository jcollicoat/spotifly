/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { determineAccessToken } from '../../../lib/auth/server';
import { ITopArtists } from '../../../lib/client/types/artists';
import { buildArtists } from '../../../lib/server/spotify';
import { IArtistAPI } from './getArtist';

const endpoint = 'https://api.spotify.com/v1/me/top/artists';

export interface ITopArtistsAPI {
    href: string;
    items: IArtistAPI[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export const buildTopArtists = async (
    data: ITopArtistsAPI
): Promise<ITopArtists> => ({
    artists: await buildArtists(data.items),
    next: data.next,
    offset: data.offset,
    previous: data.previous,
    total: data.total,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const topArtistsAPI = await axios.get<ITopArtistsAPI>(endpoint, {
            headers: {
                Authorization: access_token,
            },
        });

        const builtTopArtists = await buildTopArtists(topArtistsAPI.data);

        res.status(200).json(builtTopArtists);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

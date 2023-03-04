/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { AddonsDTO } from '../../../lib/_addons/types';
import { buildTopArtists } from '../../../lib/artists/builders';
import { TopArtistsDTO } from '../../../lib/artists/types';
import { determineAccessToken } from '../../../lib/_auth/server';

const endpoint = 'https://api.spotify.com/v1/me/top/artists';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const topArtistsAPI = await axios.get<TopArtistsDTO>(endpoint, {
            headers: {
                Authorization: access_token,
            },
        });

        try {
            // Fetch addons here

            const addons: AddonsDTO | undefined = undefined;

            const builtTopArtists = await buildTopArtists(
                topArtistsAPI.data,
                addons
            );

            res.status(200).json(builtTopArtists);
        } catch (error) {
            const { status, message } = handleError(error);
            console.warn({
                summary: 'Error fetching topArtists addons.',
                status: status,
                message: message,
            });

            const builtTopArtists = await buildTopArtists(topArtistsAPI.data);

            res.status(200).json(builtTopArtists);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

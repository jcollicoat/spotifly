/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IAddonsDTO } from '../../../lib/addons/types';
import { buildArtist } from '../../../lib/artists/builders';
import { IArtistAPI } from '../../../lib/artists/types';
import { determineAccessToken } from '../../../lib/auth/server';
import { handleError } from '../../../lib/server/helpers';

const endpoint = 'https://api.spotify.com/v1/artists/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const artistID = req.query.artistID;
        const artistAPI = await axios.get<IArtistAPI>(endpoint + artistID, {
            headers: {
                Authorization: access_token,
            },
        });

        try {
            // Fetch addons here

            const addons: IAddonsDTO[] | undefined = undefined;

            const builtArtist = await buildArtist(artistAPI.data, addons);

            res.status(200).json(builtArtist);
        } catch (error) {
            const { status, message } = handleError(error);
            console.warn({
                summary: `Error fetching artist addons: ${artistAPI.data.id}`,
                status: status,
                message: message,
            });

            const builtTopTracks = await buildArtist(artistAPI.data);

            res.status(200).json(builtTopTracks);
        }

        const builtArtist = await buildArtist(artistAPI.data);

        res.status(200).json(builtArtist);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

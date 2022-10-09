/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { IAddonsDTO } from '../../../lib/addons/types';
import { determineAccessToken } from '../../../lib/auth/server';
import { buildTrack } from '../../../lib/tracks/builders';
import { ITrackAPI } from '../../../lib/tracks/types';

const endpoint = 'https://api.spotify.com/v1/tracks/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const trackID = req.query.trackID;
        const trackAPI = await axios.get<ITrackAPI>(endpoint + trackID, {
            headers: {
                Authorization: access_token,
            },
        });

        try {
            // Fetch addons here

            const addons: IAddonsDTO | undefined = undefined;

            const builtTrack = await buildTrack(trackAPI.data, addons);

            res.status(200).json(builtTrack);
        } catch (error) {
            const { status, message } = handleError(error);
            console.warn({
                summary: `Error fetching track addons: ${trackAPI.data.id}`,
                status: status,
                message: message,
            });

            const builtTrack = await buildTrack(trackAPI.data);

            res.status(200).json(builtTrack);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

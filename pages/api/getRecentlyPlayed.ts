/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EPRecentlyPlayed } from '../../lib/_helpers/endpoints';
import { handleError } from '../../lib/_helpers/server';
import { determineAccessToken } from '../../lib/auth/server';
import { getTracksAddons } from '../../lib/tracks/addons';
import { buildRecentlyPlayed } from '../../lib/tracks/builders';
import {
    IGetRecentlyPlayedAPI,
    ITracksAddonsDTO,
} from '../../lib/tracks/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const recentlyPlayedAPI = await axios.get<IGetRecentlyPlayedAPI>(
            EPRecentlyPlayed,
            {
                headers: {
                    Authorization: access_token,
                },
                params: {
                    limit: limit,
                },
            }
        );

        if (req.query.addons === 'true') {
            try {
                const trackIDs = recentlyPlayedAPI.data.items
                    .map((item) => item.track.id)
                    .join(',');
                const addons: ITracksAddonsDTO = await getTracksAddons(
                    access_token,
                    trackIDs
                );

                const builtRecentlyPlayed = await buildRecentlyPlayed(
                    recentlyPlayedAPI.data,
                    addons
                );

                res.status(200).json(builtRecentlyPlayed);
            } catch (error) {
                const { status, message } = handleError(error);
                console.warn({
                    summary: 'Error fetching recentlyPlayed addons.',
                    status: status,
                    message: message,
                });

                const builtRecentlyPlayed = await buildRecentlyPlayed(
                    recentlyPlayedAPI.data
                );

                res.status(200).json(builtRecentlyPlayed);
            }
        } else {
            const builtRecentlyPlayed = await buildRecentlyPlayed(
                recentlyPlayedAPI.data
            );

            res.status(200).json(builtRecentlyPlayed);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

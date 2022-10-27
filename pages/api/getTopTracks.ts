/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EPTopTracks } from '../../lib/_helpers/endpoints';
import { handleError } from '../../lib/_helpers/server';
import { determineAccessToken } from '../../lib/auth/server';
import { getTracksAddons } from '../../lib/tracks/addons';
import { buildTopTracks } from '../../lib/tracks/builders';
import { ITopTracksAPI, ITracksAddonsDTO } from '../../lib/tracks/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const topTracksAPI = await axios.get<ITopTracksAPI>(EPTopTracks, {
            headers: {
                Authorization: access_token,
            },
        });

        if (req.query.addons === 'true') {
            try {
                const trackIDs = topTracksAPI.data.items
                    .map((track) => track.id)
                    .join(',');
                const addons: ITracksAddonsDTO = await getTracksAddons(
                    access_token,
                    trackIDs
                );

                const builtTopTracks = await buildTopTracks(
                    topTracksAPI.data,
                    addons
                );

                res.status(200).json(builtTopTracks);
            } catch (error) {
                const { status, message } = handleError(error);
                console.warn({
                    summary: 'Error fetching topTracks addons.',
                    status: status,
                    message: message,
                });

                const builtTopTracks = await buildTopTracks(topTracksAPI.data);

                res.status(200).json(builtTopTracks);
            }
        } else {
            const builtTopTracks = await buildTopTracks(topTracksAPI.data);

            res.status(200).json(builtTopTracks);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

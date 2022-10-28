/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EPTrack } from '../../lib/_helpers/endpoints';
import { handleError } from '../../lib/_helpers/server';
import { determineAccessToken } from '../../lib/auth/server';
import { getTrackAddons } from '../../lib/tracks/addons';
import { buildTrack } from '../../lib/tracks/builders';
import { ITrackAddonsDTO, ITrackAPI } from '../../lib/tracks/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const trackID = req.query.trackID;
        const trackAPI = await axios.get<ITrackAPI>(EPTrack + trackID, {
            headers: {
                Authorization: access_token,
            },
        });

        if (req.query.addons === 'true') {
            try {
                const addons: ITrackAddonsDTO = await getTrackAddons(
                    access_token,
                    trackAPI.data.id
                );

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
        } else {
            const builtTrack = await buildTrack(trackAPI.data);

            res.status(200).json(builtTrack);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

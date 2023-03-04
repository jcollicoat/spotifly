import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { EPTopTracks } from '../../lib/_helpers/endpoints';
import { handleError } from '../../lib/_helpers/server';
import { determineAccessToken } from '../../lib/auth/server';
import { getTrackAddons } from '../../lib/tracks/addons';
import { buildTrack } from '../../lib/tracks/builders';
import { TopTracksDTO, TrackAddonsDTO } from '../../lib/tracks/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const topTracksAPI = await axios.get<TopTracksDTO>(EPTopTracks, {
            headers: {
                Authorization: access_token,
            },
            params: {
                limit: 1,
            },
        });
        const topTrackAPI = topTracksAPI.data.items[0];

        if (req.query.addons === 'true') {
            try {
                const addons: TrackAddonsDTO = await getTrackAddons(
                    access_token,
                    topTrackAPI.id
                );

                const builtTopTrack = await buildTrack(topTrackAPI, addons);

                res.status(200).json(builtTopTrack);
            } catch (error) {
                const { status, message } = handleError(error);
                console.warn({
                    summary: 'Error fetching topTrack addons.',
                    status: status,
                    message: message,
                });

                const builtTopTrack = await buildTrack(topTrackAPI);

                res.status(200).json(builtTopTrack);
            }
        } else {
            const builtTopTrack = await buildTrack(topTrackAPI);

            res.status(200).json(builtTopTrack);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

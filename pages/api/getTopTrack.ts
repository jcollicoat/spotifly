import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../lib/_helpers/server';
import { determineAccessToken } from '../../lib/auth/server';
import { getTrackAddons } from '../../lib/tracks/addons';
import { buildTopTrack } from '../../lib/tracks/builders';
import { ITopTracksAPI, ITrackAddonsDTO } from '../../lib/tracks/types';

const EPTopTracks = 'https://api.spotify.com/v1/me/top/tracks';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const useAddons = req.query.addons === 'true';

        const topTracksAPI = await axios.get<ITopTracksAPI>(EPTopTracks, {
            headers: {
                Authorization: access_token,
            },
            params: {
                limit: 1,
            },
        });
        const topTrackAPI = topTracksAPI.data.items[0];

        if (useAddons) {
            try {
                const addons: ITrackAddonsDTO = await getTrackAddons(
                    access_token,
                    topTrackAPI.id
                );

                const builtTopTrack = await buildTopTrack(topTrackAPI, addons);

                res.status(200).json(builtTopTrack);
            } catch (error) {
                const { status, message } = handleError(error);
                console.warn({
                    summary: 'Error fetching topTrack addons.',
                    status: status,
                    message: message,
                });

                const builtTopTrack = await buildTopTrack(topTrackAPI);

                res.status(200).json(builtTopTrack);
            }
        } else {
            const builtTopTrack = await buildTopTrack(topTrackAPI);

            res.status(200).json(builtTopTrack);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

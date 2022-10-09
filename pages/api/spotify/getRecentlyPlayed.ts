/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { IAddonsDTO, IAudioFeaturesListAPI } from '../../../lib/addons/types';
import { determineAccessToken } from '../../../lib/auth/server';
import { buildRecentlyPlayed } from '../../../lib/tracks/builders';
import { IRecentlyPlayedAPI } from '../../../lib/tracks/types';

const endpoint = 'https://api.spotify.com/v1/me/player/recently-played';
const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const recentlyPlayedAPI = await axios.get<IRecentlyPlayedAPI>(
            endpoint,
            {
                headers: {
                    Authorization: access_token,
                },
                params: {
                    limit: limit,
                },
            }
        );

        try {
            const ids = recentlyPlayedAPI.data.items
                .map((item) => item.track.id)
                .join(',');
            const audioFeaturesAPI = await axios.get<IAudioFeaturesListAPI>(
                endpoint_audio_features,
                {
                    headers: {
                        Authorization: access_token,
                    },
                    params: {
                        ids: ids,
                    },
                }
            );

            const addons: IAddonsDTO = {
                audio_features: audioFeaturesAPI.data,
            };

            const builtRecentlyPlayed = await buildRecentlyPlayed(
                recentlyPlayedAPI.data,
                addons
            );

            res.status(200).json(builtRecentlyPlayed);
        } catch (error) {
            const { status, message } = handleError(error);
            console.warn({
                summary: 'Error fetching topTracks addons.',
                status: status,
                message: message,
            });

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

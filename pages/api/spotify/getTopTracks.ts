/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { IAddonsDTO, IAudioFeaturesListAPI } from '../../../lib/addons/types';
import { determineAccessToken } from '../../../lib/auth/server';
import { buildTopTracks } from '../../../lib/tracks/builders';
import { ITopTracksAPI } from '../../../lib/tracks/types';

const endpoint = 'https://api.spotify.com/v1/me/top/tracks';
const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const topTracksAPI = await axios.get<ITopTracksAPI>(endpoint, {
            headers: {
                Authorization: access_token,
            },
        });

        try {
            const ids = topTracksAPI.data.items
                .map((track) => track.id)
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
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

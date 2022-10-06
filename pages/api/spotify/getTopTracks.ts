/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildTopTracks } from '../../../lib/server/spotify';
import {
    IAddonsTopTracksAPI,
    IAudioFeaturesAPI,
    ITopTracksAPI,
} from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me/top/tracks';
const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        const topTracksAPI = await axios.get<ITopTracksAPI>(endpoint, {
            headers: {
                Authorization: access_token,
            },
        });

        if (topTracksAPI.status !== 200) {
            res.status(topTracksAPI.status).json(topTracksAPI.data);
        } else {
            const ids = topTracksAPI.data.items
                .map((track) => track.id)
                .join(',');

            const audioFeaturesAPI = await axios.get<IAudioFeaturesAPI>(
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
            if (audioFeaturesAPI.status !== 200) {
                res.status(audioFeaturesAPI.status).json(audioFeaturesAPI.data);
            }

            const addons: IAddonsTopTracksAPI = {
                audio_features: audioFeaturesAPI.data,
            };

            const builtTopTracks = await buildTopTracks(
                topTracksAPI.data,
                addons
            );

            res.status(200).json({ builtTopTracks, addons });
        }
    }
};

export default handler;

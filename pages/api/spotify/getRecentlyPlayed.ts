/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IRecentlyPlayed } from '../../../lib/client/spotify-types';
import { determineAccessToken } from '../../../lib/server/auth';
import { handleError } from '../../../lib/server/helpers';
import { buildTracks } from '../../../lib/server/spotify';
import {
    IAddonsTracksAPI,
    IAudioFeaturesListAPI,
    ITrackAPI,
} from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me/player/recently-played';
const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

interface IRecentlyPlayedTrackAPI {
    context?: string;
    href: string;
    track: ITrackAPI;
}

interface IRecentlyPlayedAPI {
    href: string;
    items: IRecentlyPlayedTrackAPI[];
    limit: number;
    next: string | null;
    cursors: {
        after: string;
    };
    total: number;
}

const buildRecentlyPlayed = async (
    recentlyPlayedAPI: IRecentlyPlayedAPI,
    addons?: IAddonsTracksAPI
): Promise<IRecentlyPlayed> => {
    return {
        items: await buildTracks(
            recentlyPlayedAPI.items.map((item) => item.track),
            addons
        ),
        limit: recentlyPlayedAPI.limit,
        next: recentlyPlayedAPI.next,
        cursors: {
            after: recentlyPlayedAPI.cursors.after,
        },
        total: recentlyPlayedAPI.total,
    };
};

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

            const addons: IAddonsTracksAPI = {
                audio_features: audioFeaturesAPI.data,
            };

            const builtTopTracks = await buildRecentlyPlayed(
                recentlyPlayedAPI.data,
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

            const builtTopTracks = await buildRecentlyPlayed(
                recentlyPlayedAPI.data
            );

            res.status(200).json(builtTopTracks);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

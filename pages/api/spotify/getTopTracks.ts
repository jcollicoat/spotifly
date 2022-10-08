/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ITopTracks } from '../../../lib/client/types/tracks';
import { determineAccessToken } from '../../../lib/server/auth';
import { handleError } from '../../../lib/server/helpers';
import { buildTracks } from '../../../lib/server/spotify';
import {
    IAddonsTracksDTO,
    IAudioFeaturesListAPI,
} from '../../../lib/server/types/addons';
import { ITrackAPI } from './getTrack';

const endpoint = 'https://api.spotify.com/v1/me/top/tracks';
const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

export interface ITopTracksAPI {
    href: string;
    items: ITrackAPI[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

const buildTopTracks = async (
    topTracksAPI: ITopTracksAPI,
    addons?: IAddonsTracksDTO
): Promise<ITopTracks> => {
    return {
        items: await buildTracks(topTracksAPI.items, addons),
        next: topTracksAPI.next,
        offset: topTracksAPI.offset,
        previous: topTracksAPI.previous,
        total: topTracksAPI.total,
    };
};

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

            const addons: IAddonsTracksDTO = {
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

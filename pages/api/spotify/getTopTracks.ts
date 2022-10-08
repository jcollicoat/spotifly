/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ITopTracks, AlbumImageSize } from '../../../lib/client/spotify-types';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildTracks } from '../../../lib/server/spotify';
import {
    IAudioFeaturesAPI,
    ITrackAPI,
} from '../../../lib/server/spotify-types';

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

export interface IAddonsTopTracksAPI {
    audio_features?: IAudioFeaturesAPI;
}

export interface ITopTracksDTO {
    topTracksAPI: ITopTracksAPI;
    addons: IAddonsTopTracksAPI;
}

const buildTopTracks = async (
    topTracksAPI: ITopTracksAPI,
    addons?: IAddonsTopTracksAPI
): Promise<ITopTracks> => {
    return {
        items: await buildTracks(
            topTracksAPI.items,
            addons,
            AlbumImageSize.medium
        ),
        next: topTracksAPI.next,
        offset: topTracksAPI.offset,
        previous: topTracksAPI.previous,
        total: topTracksAPI.total,
    };
};

type ErrorResponse = {
    status: number;
    message: string;
};

const handleError = (error: unknown): ErrorResponse => {
    if (error instanceof AxiosError)
        return {
            status: error.response?.status ?? 400,
            message: `Error fetching Spotify API endpoint ${
                error.request.path ?? '[apiPathNotFound]'
            } | ${
                error.response?.data.error.message ?? '[errorMessageNotFound]'
            }.`,
        };
    if (error instanceof Error)
        return {
            status: 400,
            message: error.message,
        };
    return {
        status: 500,
        message: `Unknown error occured: ${error}`,
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

            const addons: IAddonsTopTracksAPI = {
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

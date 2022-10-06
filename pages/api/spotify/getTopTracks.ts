/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    ITopTracks,
    ITrack,
    AlbumImageSize,
} from '../../../lib/client/spotify-types';
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
    addons: IAddonsTopTracksAPI
): Promise<ITopTracks<ITrack>> => {
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

/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { IAddonsDTO, IAudioFeaturesListAPI } from '../../../lib/addons/types';
import { buildAlbum } from '../../../lib/albums/builders';
import { IAlbumAPI } from '../../../lib/albums/types';
import { determineAccessToken } from '../../../lib/auth/server';

const endpoint = 'https://api.spotify.com/v1/albums/';
const endpoint_audio_features = 'https://api.spotify.com/v1/audio-features';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const albumID = req.query.albumID;
        const albumAPI = await axios.get<IAlbumAPI>(endpoint + albumID, {
            headers: {
                Authorization: access_token,
            },
        });

        try {
            const ids = albumAPI.data.tracks.items
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

            const builtAlbum = await buildAlbum(albumAPI.data, addons);

            res.status(200).json(builtAlbum);
        } catch (error) {
            const { status, message } = handleError(error);
            console.warn({
                summary: `Error fetching album addons: ${albumAPI.data.id}`,
                status: status,
                message: message,
            });

            const builtTopTracks = await buildAlbum(albumAPI.data);

            res.status(200).json(builtTopTracks);
        }
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildTrack } from '../../../lib/server/spotify';
import { IItemArtistDTO } from '../../../lib/server/types/_simple';
import { IAlbumAPI } from './getAlbum';

const endpoint = 'https://api.spotify.com/v1/tracks/';

export interface ITrackAPI {
    id: string;
    album: IAlbumAPI;
    artists: IItemArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        ean: string;
        isrc: string;
        upc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

const getTrack = async (
    req: NextApiRequest
): Promise<AxiosResponse<ITrackAPI> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    const trackID = req.query.trackID;
    return await axios.get<ITrackAPI>(endpoint + trackID, {
        headers: {
            Authorization: access_token,
        },
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getTrack(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = await buildTrack(api.data);
        res.status(200).json(built);
    }
};

export default handler;

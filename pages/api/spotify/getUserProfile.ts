/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/server/auth';
import { buildUserProfile } from '../../../lib/server/spotify';

const endpoint = 'https://api.spotify.com/v1/me';

export interface IUserProfileAPI {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: true;
        filter_locked: true;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: [
        {
            url: string;
            height: number;
            width: number;
        }
    ];
    product: string;
    type: string;
    uri: string;
}

const getUserProfile = async (
    req: NextApiRequest
): Promise<AxiosResponse<IUserProfileAPI> | null> => {
    const access_token = await determineAccessToken(req);
    if (access_token === null) {
        return access_token;
    }

    return await axios.get<IUserProfileAPI>(endpoint, {
        headers: {
            Authorization: access_token,
        },
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const api = await getUserProfile(req);

    if (!api) {
        res.status(401).send('Invalid Spotify access_token provided.');
    } else {
        if (api.status !== 200) {
            res.status(api.status).json(api.data);
        }
        const built = buildUserProfile(api.data);
        res.status(200).json(built);
    }
};

export default handler;

/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { determineAccessToken } from '../../../lib/auth/server';
import { handleError } from '../../../lib/server/helpers';
import { IUserProfile } from '../../../lib/user/types';

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

export const buildUserProfile = (data: IUserProfileAPI): IUserProfile => ({
    country: data.country,
    display_name: data.display_name,
    followers: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    product: data.product,
    type: data.type,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const userProfileAPI = await axios.get<IUserProfileAPI>(endpoint, {
            headers: {
                Authorization: access_token,
            },
        });

        const builtUserProfile = await buildUserProfile(userProfileAPI.data);

        res.status(200).json(builtUserProfile);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

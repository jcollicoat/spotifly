/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../../lib/_helpers/server';
import { determineAccessToken } from '../../../lib/auth/server';
import { buildUserProfile } from '../../../lib/user/builders';
import { IUserProfileAPI } from '../../../lib/user/types';

const endpoint = 'https://api.spotify.com/v1/me';

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

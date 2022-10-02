/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { IUserProfile } from '../../../lib/client/spotify-types';
import { IUserProfileDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/me';

const buildUserProfile = (data: IUserProfileDTO): IUserProfile => ({
    country: data.country,
    display_name: data.display_name,
    followers: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    product: data.product,
    type: data.type,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = buildUserProfile(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

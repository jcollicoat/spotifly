import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

const ENV = process.env.ENV;

export const determineAccessToken = async (
    req: NextApiRequest
): Promise<string> => {
    const session = await getSession({ req });

    if (session) {
        console.log('Using session access_token');
        return `Bearer ${session.access_token}`;
    } else if (ENV === 'local' && req.rawHeaders[1].match(/Bearer /g)) {
        console.log('Using Postman access_token');
        // Postman passes Bearer prefix already
        return req.rawHeaders[1];
    } else {
        throw new Error('Invalid Spotify access_token provided.');
    }
};

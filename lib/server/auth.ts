import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

const ENV = process.env.ENV;

export const determineAccessToken = async (
    req: NextApiRequest
): Promise<string | null> => {
    const session = await getSession({ req });

    if (session) {
        return `Bearer ${session.access_token}`;
    } else if (ENV === 'local' && req.rawHeaders[1].match(/Bearer /g)) {
        // Header Prefix in Postman Auth
        return req.rawHeaders[1];
    } else {
        return null;
    }
};

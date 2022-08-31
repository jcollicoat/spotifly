import { URLSearchParams } from 'url';
import axios from 'axios';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

const endpoint = 'https://accounts.spotify.com/api/token';

interface IAccessToken {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    scope: string;
}

export const getAccessToken = async (
    refresh_token: string
): Promise<IAccessToken> => {
    const response = await axios.post(
        endpoint,
        new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: `${refresh_token}`,
        }).toString(),
        {
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data;
};

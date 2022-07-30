import { URLSearchParams } from 'url';
import axios from 'axios';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const endpoint = 'https://accounts.spotify.com/api/token';
const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

interface IAccessToken {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    scope: string;
}

export const getAccessToken = async (): Promise<IAccessToken> => {
    const response = await axios.post(
        endpoint,
        new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: `${REFRESH_TOKEN}`,
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

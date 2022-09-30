/* eslint-disable require-await */
import axios from 'axios';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

const scope = 'user-top-read';

/**
 * Takes a token, and returns a new token with updated
 * `access_token` and `access_token_expires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
    try {
        console.log('Attempting to refresh access token');
        const endpoint = 'https://accounts.spotify.com/api/token';

        const response = await axios.post(
            endpoint,
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: `${token.refresh_token}`,
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${basic}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const refreshedToken = await response.data;

        if (response.status !== 200) {
            console.warn(
                `Error fetching new access token: ${response.status} | ${response.statusText}`
            );
            throw refreshedToken;
        }

        console.log(
            `Refresh access token successfully. New expiry: ${new Date(
                Date.now() + refreshedToken.expires_in * 1000
            )}`
        );
        return {
            ...token,
            access_token: refreshedToken.access_token,
            access_token_expires: Date.now() + refreshedToken.expires_in * 1000, // Need to add 1000 to convert to ms number
        };
    } catch (error) {
        console.error(`Failed to refresh access token: ${error}`);

        return {
            ...token,
            error: 'refreshAccessTokenError',
        };
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            authorization: {
                params: { scope },
            },
            clientId: CLIENT_ID as string,
            clientSecret: CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        // TODO: Logic here is wrong for new sign ins
        async jwt({ token, account }) {
            if (account) {
                token.refresh_token = account.refresh_token;
                token.access_token = account.access_token;
                token.access_token_expires =
                    account.expires_at && account.expires_at;
            }

            if (typeof token.access_token_expires === 'number') {
                // Return previous token if the access token has not expired yet
                if (Date.now() < token.access_token_expires) {
                    return token;
                }

                // Access token has expired, try to update it
                return refreshAccessToken(token);
            }

            return token;
        },
        async session({ session, user, token }) {
            session.user = user;
            session.refresh_token = token.refresh_token;
            session.access_token = token.access_token;
            session.access_token_expires = token.access_token_expires;
            return session;
        },
    },
});

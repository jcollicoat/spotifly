/* eslint-disable require-await */
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const scope = 'user-top-read';

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
        async jwt({ token, account }) {
            if (account) {
                token.refresh_token = account.refresh_token;
                token.access_token = account.access_token;
                token.expires_in = account.expires_at;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user = user;
            session.refresh_token = token.refresh_token;
            session.access_token = token.access_token;
            session.expires_in = token.expires_in;
            return session;
        },
    },
});

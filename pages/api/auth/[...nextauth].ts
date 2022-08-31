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
                token.accessToken = account.refresh_token;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user = user;
            session.refresh_token = token.accessToken;
            return session;
        },
    },
});

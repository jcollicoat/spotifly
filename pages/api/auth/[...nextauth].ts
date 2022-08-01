/* eslint-disable require-await */
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

const scope =
    'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: CLIENT_ID as string,
            clientSecret: CLIENT_SECRET as string,
            authorization: {
                params: { scope },
            },
        }),
    ],
    secret: NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id = account.id;
                token.expires_at = account.expires_at;
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    //pages: {
    //signIn: '/login',
    //},
});

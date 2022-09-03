import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { ITopTracksDTO } from '../lib/interfaces/spotify';
import { getTopTracks } from '../lib/spotify';

const Home: NextPage = () => {
    const { data: session } = useSession();

    const {
        data: topTracks,
        isError,
        isLoading,
    } = useQuery<ITopTracksDTO | null>(['topTracks'], getTopTracks);

    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isLoading && <div>Loading...</div>}
            {isError && <div>An error occured.</div>}
            {topTracks && (
                <ol>
                    {topTracks.items.map((track) => (
                        <li key={track.id}>
                            {track.name} — {track.artists[0].name}
                        </li>
                    ))}
                </ol>
            )}
            {session ? (
                <button onClick={() => signOut()}>Sign out</button>
            ) : (
                <button onClick={() => signIn()}>Sign in</button>
            )}
        </>
    );
};

export default Home;

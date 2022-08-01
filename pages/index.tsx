import axios from 'axios';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import { ITopTrackDTO } from '../interfaces/spotify/ITopTrackDTO';

const Home: NextPage = () => {
    const { data: session } = useSession();
    const [topTracks, setTopTracks] = useState<ITopTrackDTO>();

    const getTopTracks = async () => {
        const { data } = await axios.get('/api/spotify/topTracks');
        setTopTracks(data);
    };

    getTopTracks();

    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {topTracks && (
                <ol>
                    {topTracks.items.map((track) => (
                        <li key={track.id}>{track.name}</li>
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

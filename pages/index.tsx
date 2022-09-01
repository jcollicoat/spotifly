import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
// import { useState } from 'react';
import { ITopTracksDTO } from '../interfaces/spotify/ITopTracksDTO';

const Home: NextPage = () => {
    const { data: session } = useSession();

    const getTopTracks = async () => {
        if (!session) {
            return null;
        }
        const { data } = await axios.get('/api/spotify/topTracks');
        return data;
    };

    const {
        data: topTracks,
        isError,
        isLoading,
    } = useQuery<ITopTracksDTO | null>(['topTracks'], getTopTracks);
    console.log(topTracks);

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>An error occured.</div>;

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
                <>
                    <button onClick={() => signOut()}>Sign out</button>
                    <button onClick={getTopTracks}>Get top tracks</button>
                </>
            ) : (
                <button onClick={() => signIn()}>Sign in</button>
            )}
        </>
    );
};

export default Home;

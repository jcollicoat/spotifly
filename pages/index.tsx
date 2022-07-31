import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ITopTrackDTO } from '../interfaces/spotify/ITopTrackDTO';

const Home: NextPage = () => {
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
        </>
    );
};

export default Home;

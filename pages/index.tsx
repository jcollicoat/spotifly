import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    const getTopTracks = async () => {
        const response = await axios.get('/api/spotify/topTracks');
        return response.data;
    };
    const topTracks = getTopTracks();

    console.log(topTracks);

    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <ol></ol>
            </div>
        </>
    );
};

export default Home;

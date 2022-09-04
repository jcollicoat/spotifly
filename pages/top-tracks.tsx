import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header/Header';
import { ITopTracksDTO } from '../lib/interfaces/spotify';
import { getTopTracks } from '../lib/spotify';

const TopTracks: NextPage = () => {
    const {
        data: topTracks,
        isError,
        isLoading,
    } = useQuery<ITopTracksDTO>(['topTracks'], getTopTracks);

    return (
        <>
            <Head>
                <title>Top Tracks</title>
                <meta name="description" content="Spotifly: Top Tracks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
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
        </>
    );
};

export default TopTracks;

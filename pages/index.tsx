import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { AppPage } from '../components/AppPage/AppPage';
import { Header } from '../components/Header/Header';
import { TopTracks } from '../components/TopTracks/TopTracks';

const Home: NextPage = () => {
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppPage>
                <Header />
                {session && <TopTracks />}
            </AppPage>
        </>
    );
};

export default Home;

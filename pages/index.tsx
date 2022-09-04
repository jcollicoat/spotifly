import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header/Header';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        </>
    );
};

export default Home;

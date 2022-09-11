import { NextPage } from 'next';
import Head from 'next/head';
import { AppPage } from '../../components/AppPage/AppPage';
import { TopTracks } from '../../components/TopTracks/TopTracks';

const TopLists: NextPage = () => (
    <>
        <Head>
            <title>Top Lists | Spotifly</title>
            <meta name="description" content="Top Lists" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppPage>
            <TopTracks />
        </AppPage>
    </>
);

export default TopLists;

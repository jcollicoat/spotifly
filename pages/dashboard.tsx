import { NextPage } from 'next';
import Head from 'next/head';
import { AppPage } from '../components/AppPage/AppPage';
import { TopTracks } from '../components/TopTracks/TopTracks';
import { UserProfile } from '../components/UserProfile/UserProfile';

const TopLists: NextPage = () => (
    <>
        <Head>
            <title>Top Lists | Spotifly</title>
            <meta name="description" content="Top Lists" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppPage page="dashboard">
            <UserProfile />
            <TopTracks />
        </AppPage>
    </>
);

export default TopLists;

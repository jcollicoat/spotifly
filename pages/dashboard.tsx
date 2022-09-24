import { NextPage } from 'next';
import Head from 'next/head';
import { AppPage } from '../components/AppPage/AppPage';
import { TrackList } from '../components/TrackList/TrackList';
import { UserProfile } from '../components/UserProfile/UserProfile';

const TopLists: NextPage = () => (
    <>
        <Head>
            <title>Dashboard | Spotifly</title>
            <meta name="description" content="Top Lists" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppPage page="dashboard">
            <UserProfile />
            <TrackList
                subheading="Your music"
                title="Recently Played"
                type="recently-played"
            />
            <TrackList
                subheading="Last 6 months"
                title="Your Top Tracks"
                type="top-tracks"
            />
        </AppPage>
    </>
);

export default TopLists;

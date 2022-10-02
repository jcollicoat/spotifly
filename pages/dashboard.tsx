import { NextPage } from 'next';
import Head from 'next/head';
import { AppPage } from '../components/AppPage/AppPage';
import { TrackFeature } from '../components/TrackFeature/TrackFeature';
import { TrackList } from '../components/TrackList/TrackList';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { useTopArtists } from '../hooks/useSpotify';

const TopLists: NextPage = () => {
    const { data, isError, isLoading } = useTopArtists();
    console.log(data, `Error: ${isError}`, `Loading: ${isLoading}`);

    return (
        <>
            <Head>
                <title>Dashboard | Spotifly</title>
                <meta name="description" content="Top Lists" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppPage page="dashboard">
                <UserProfile />
                <TrackFeature
                    track="recently-played"
                    subheading="Last Played Track"
                />
                <TrackList
                    list="recently-played"
                    subheading="Your music"
                    title="Recently Played"
                />
                <TrackList
                    list="top-tracks"
                    subheading="Last 6 months"
                    title="Your Top Tracks"
                />
            </AppPage>
        </>
    );
};

export default TopLists;

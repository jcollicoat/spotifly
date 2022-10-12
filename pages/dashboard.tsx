import { NextPage } from 'next';
import Head from 'next/head';
import { AppPage } from '../components/AppPage/AppPage';
import { ArtistList } from '../components/ArtistList/ArtistList';
import { TrackList } from '../components/Panels/TrackList';
import { TrackFeature } from '../components/TrackFeature/TrackFeature';
import { UserProfile } from '../components/UserProfile/UserProfile';
// import { useTopArtists } from '../hooks/useSpotify';

const TopLists: NextPage = () => {
    // const { data, isError, isLoading } = useTopArtists();
    // console.log(data, `Error: ${isError}`, `Loading: ${isLoading}`);

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
                    subheadingLevel="h2"
                />
                <TrackList
                    list="recently-played"
                    subheading="Recently Played"
                    subheadingLevel="h2"
                />
                <TrackList
                    list="top-tracks"
                    subheading="Your Top Tracks"
                    subheadingLevel="h2"
                />
                <ArtistList
                    list="top-artists"
                    subheading="Your Top Artists"
                    subheadingLevel="h2"
                />
            </AppPage>
        </>
    );
};

export default TopLists;

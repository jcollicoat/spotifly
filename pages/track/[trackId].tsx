import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppPage } from '../../components/AppPage/AppPage';
import { Spinner } from '../../components/Spinner/Spinner';
import { ITrackDTO } from '../../lib/interfaces/spotify';
import { getTrack } from '../../lib/spotify';

const Track: NextPage = () => {
    const router = useRouter();
    const { trackId } = router.query;

    const {
        data: track,
        isError,
        isLoading,
    } = useQuery<ITrackDTO>([trackId], getTrack, {
        staleTime: Infinity,
    });

    console.log(track);

    return (
        <>
            <Head>
                <title>Top Lists | Spotifly</title>
                <meta name="description" content="Top Lists" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppPage page="track">
                {isLoading && <Spinner padding="small" />}
                {isError && <div>An error occured.</div>}
                {track && track.name}
            </AppPage>
        </>
    );
};

export default Track;

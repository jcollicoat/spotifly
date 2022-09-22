import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppPage } from '../../components/AppPage/AppPage';
import { Spinner } from '../../components/Spinner/Spinner';
import { IArtistDTO } from '../../lib/interfaces/spotify';
import { getArtist } from '../../lib/spotify';

const TrackPage: NextPage = () => {
    const router = useRouter();
    const { artistId } = router.query;

    const {
        data: artist,
        isError,
        isLoading,
    } = useQuery<IArtistDTO>(['artists', artistId], getArtist, {
        staleTime: Infinity,
    });

    return (
        <>
            <Head>
                <title>
                    {artist ? `${artist.name} | Spotifly` : 'Artist | Spotifly'}
                </title>
                <meta name="description" content="Top Lists" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppPage page="track">
                {isLoading && <Spinner padding="small" />}
                {isError && <div>An error occured.</div>}
                {artist && artist.name}
            </AppPage>
        </>
    );
};

export default TrackPage;

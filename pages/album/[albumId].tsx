import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppPage } from '../../components/AppPage/AppPage';
import { Spinner } from '../../components/Spinner/Spinner';
import { getAlbum } from '../../lib/client/api';
import { IAlbum } from '../../lib/client/spotify-types';

const AlbumPage: NextPage = () => {
    const router = useRouter();
    const { albumId: albumID } = router.query;

    const {
        data: album,
        isError,
        isLoading,
    } = useQuery<IAlbum>(['albums', albumID], getAlbum, {
        staleTime: Infinity,
    });

    return (
        <>
            <Head>
                <title>
                    {album
                        ? `${album.name} by ${album.artists[0].name} | Spotifly`
                        : 'Album | Spotifly'}
                </title>
                <meta name="description" content="Top Lists" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppPage page="album">
                {isLoading && <Spinner padding="small" />}
                {isError && <div>An error occured.</div>}
                {album && album.name}
            </AppPage>
        </>
    );
};

export default AlbumPage;

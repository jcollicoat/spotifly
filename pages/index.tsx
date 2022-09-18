import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppPage } from '../components/AppPage/AppPage';

const Home: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    if (session) {
        router.push('/dashboard');
    }

    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppPage page="home" />
        </>
    );
};

export default Home;

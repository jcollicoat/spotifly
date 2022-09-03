import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';

const Home: NextPage = () => {
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Spotifly</title>
                <meta name="description" content="Spotifly app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {session ? (
                <button onClick={() => signOut()}>Sign out</button>
            ) : (
                <button onClick={() => signIn()}>Sign in</button>
            )}
        </>
    );
};

export default Home;

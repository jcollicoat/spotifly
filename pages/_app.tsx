import '../styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default MyApp;

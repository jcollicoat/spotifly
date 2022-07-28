import '../styles/globals.scss';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

// eslint-disable-next-line import/no-default-export
export default MyApp;

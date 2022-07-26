import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { Header } from '../Header/Header';
import { Spinner } from '../Spinner/Spinner';
import { Unauthenticated } from '../Unauthenticated/Unauthenticated';
import styles from './AppPage.module.scss';

interface IAppPage {
    children?: React.ReactNode;
    page: 'album' | 'artist' | 'dashboard' | 'home' | 'track';
}

export const AppPage: FC<IAppPage> = ({ children, page }) => {
    const { status } = useSession();

    const pageContent = () => {
        if (status === 'loading') {
            return <Spinner padding="large" />;
        }

        if (status === 'unauthenticated') {
            return <Unauthenticated />;
        }

        return children;
    };

    return (
        <>
            <Header />
            <main className={classNames(styles.main, styles[page])}>
                {pageContent()}
            </main>
        </>
    );
};

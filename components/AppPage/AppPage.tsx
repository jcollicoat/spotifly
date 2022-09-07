import { FC } from 'react';
import { Header } from '../Header/Header';
import styles from './AppPage.module.scss';

interface IAppPage {
    children: React.ReactNode;
}

export const AppPage: FC<IAppPage> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
        </>
    );
};

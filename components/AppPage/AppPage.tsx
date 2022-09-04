import { FC } from 'react';
import styles from './AppPage.module.scss';

interface IAppPage {
    children: React.ReactNode;
}

export const AppPage: FC<IAppPage> = ({ children }) => {
    return <main className={styles.page}>{children}</main>;
};

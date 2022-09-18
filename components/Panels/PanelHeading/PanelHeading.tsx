import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelHeading.module.scss';

export interface IPanelHeading {
    title: string;
    heading?: string;
    large?: true;
}

export const PanelHeading: FC<IPanelHeading> = ({ title, heading, large }) => (
    <header className={styles.wrapper}>
        {heading && <div className={styles.heading}>{heading}</div>}
        <h2 className={classNames(styles.title, large && styles.large)}>
            {title}
        </h2>
    </header>
);

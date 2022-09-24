import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelHeading.module.scss';

export interface IPanelHeading {
    title: string;
    subheading: string;
    large?: true;
}

export const PanelHeading: FC<IPanelHeading> = ({
    title,
    subheading,
    large,
}) => (
    <header className={styles.wrapper}>
        <div className={styles.heading}>{subheading}</div>
        <h2 className={classNames(styles.title, large && styles.large)}>
            {title}
        </h2>
    </header>
);

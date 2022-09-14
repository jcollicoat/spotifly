import { FC } from 'react';
import styles from './PanelHeading.module.scss';

interface IPanelHeading {
    heading: string;
    subheading?: string;
}

export const PanelHeading: FC<IPanelHeading> = ({ heading, subheading }) => (
    <header className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        {subheading && <span className={styles.subheading}>{subheading}</span>}
    </header>
);

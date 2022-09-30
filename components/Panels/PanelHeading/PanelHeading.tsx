import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelHeading.module.scss';

export interface IPanelHeading {
    title?: string;
    subheading?: string;
    large?: true;
}

export const PanelHeading: FC<IPanelHeading> = ({
    title,
    subheading,
    large,
}) => {
    if (!title && !subheading) {
        return null;
    }
    return (
        <header className={classNames(styles.wrapper, title && styles.padded)}>
            {subheading && (
                <div className={styles.subheading}>{subheading}</div>
            )}
            {title && (
                <h2 className={classNames(styles.title, large && styles.large)}>
                    {title}
                </h2>
            )}
        </header>
    );
};

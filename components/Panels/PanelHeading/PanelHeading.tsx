import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelHeading.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface IPanelHeading {
    subheading?: string;
    subheadingLevel?: HeadingLevel;
    title?: string;
    large?: true;
}

export const PanelHeading: FC<IPanelHeading> = ({
    subheading,
    subheadingLevel,
    title,
    large,
}) => {
    if (!title && !subheading) {
        return null;
    }

    const displaySubheading = () => {
        switch (subheadingLevel) {
            case 1:
                return <h1 className={styles.subheading}>{subheading}</h1>;
            case 2:
                return <h2 className={styles.subheading}>{subheading}</h2>;
            case 3:
                return <h3 className={styles.subheading}>{subheading}</h3>;
            case 4:
                return <h4 className={styles.subheading}>{subheading}</h4>;
            case 5:
                return <h5 className={styles.subheading}>{subheading}</h5>;
            case 6:
                return <h6 className={styles.subheading}>{subheading}</h6>;
            default:
                return <div className={styles.subheading}>{subheading}</div>;
        }
    };

    return (
        <header className={styles.wrapper}>
            {subheading && displaySubheading()}
            {title && (
                <h2 className={classNames(styles.title, large && styles.large)}>
                    {title}
                </h2>
            )}
        </header>
    );
};

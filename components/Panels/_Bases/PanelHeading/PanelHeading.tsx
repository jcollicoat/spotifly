import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelHeading.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface IPanelHeading {
    subheading?: string;
    subheadingLevel?: HeadingLevel;
    title?: string;
    titleLevel?: HeadingLevel;
    titleLarge?: true;
    large?: true;
}

export const PanelHeading: FC<IPanelHeading> = ({
    subheading,
    subheadingLevel,
    title,
    titleLevel,
    titleLarge,
}) => {
    if (!title && !subheading) {
        return null;
    }

    const displaySubheading = () => {
        if (!title) {
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
                    return <h2 className={styles.subheading}>{subheading}</h2>;
            }
        }
        return <div className={styles.subheading}>{subheading}</div>;
    };

    const displayTitle = () => {
        const className = classNames(styles.title, titleLarge && styles.large);
        switch (titleLevel) {
            case 1:
                return <h1 className={className}>{title}</h1>;
            case 3:
                return <h3 className={className}>{title}</h3>;
            case 4:
                return <h4 className={className}>{title}</h4>;
            case 5:
                return <h5 className={className}>{title}</h5>;
            case 6:
                return <h6 className={className}>{title}</h6>;
            default:
                return <h2 className={className}>{title}</h2>;
        }
    };

    return (
        <header className={styles.wrapper}>
            {subheading && displaySubheading()}
            {title && displayTitle()}
        </header>
    );
};

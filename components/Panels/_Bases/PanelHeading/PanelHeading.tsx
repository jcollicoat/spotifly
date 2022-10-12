import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelHeading.module.scss';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IDynamicHeading {
    children: React.ReactNode;
    isTitle?: 'regular' | 'large';
    level?: HeadingLevel;
}

const DynamicHeading: FC<IDynamicHeading> = ({ children, isTitle, level }) => {
    if (isTitle) {
        const className = classNames(
            styles.title,
            isTitle === 'large' && styles.large
        );
        if (level) {
            const Heading = level;
            return <Heading className={className}>{children}</Heading>;
        }
        return <h2 className={className}>{children}</h2>;
    } else {
        if (level) {
            const Heading = level;
            return <Heading className={styles.subheading}>{children}</Heading>;
        }
        return <div className={styles.subheading}>{children}</div>;
    }
};

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

    return (
        <header className={styles.wrapper}>
            {subheading && (
                <DynamicHeading level={subheadingLevel}>
                    {subheading}
                </DynamicHeading>
            )}
            {title && (
                <DynamicHeading
                    isTitle={titleLarge ? 'large' : 'regular'}
                    level={titleLevel}
                >
                    {title}
                </DynamicHeading>
            )}
        </header>
    );
};

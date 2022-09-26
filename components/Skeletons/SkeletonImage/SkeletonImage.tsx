import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import styles from './SkeletonImage.module.scss';

interface ISkeletonImage {
    height?: string;
    loading?: boolean;
    rounded?: boolean;
    width?: string;
}

export const SkeletonImage: FC<ISkeletonImage> = ({
    height = '100%',
    loading = false,
    rounded = false,
    width = '100%',
}) => {
    const inlineStyles: CSSProperties = {
        borderRadius: rounded ? '50%' : '4px',
        height,
        width,
    };

    return (
        <div
            aria-hidden
            className={classNames(styles.skeleton, loading && styles.loading)}
            style={inlineStyles}
        ></div>
    );
};
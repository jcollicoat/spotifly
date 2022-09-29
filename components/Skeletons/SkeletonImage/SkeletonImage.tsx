import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import { SkeletonStates } from '../../interfaces';
import styles from './SkeletonImage.module.scss';

interface ISkeletonImage {
    height: string;
    width: string;
    rounded?: boolean;
    state?: SkeletonStates;
}

export const SkeletonImage: FC<ISkeletonImage> = ({
    height = '100%',
    width = '100%',
    rounded = false,
    state,
}) => {
    const inlineStyles: CSSProperties = {
        borderRadius: rounded ? '50%' : '4px',
        height,
        width,
    };

    return (
        <div
            aria-hidden
            className={classNames(
                styles.skeleton,
                !state && styles.loading,
                state && styles[state]
            )}
            style={inlineStyles}
        ></div>
    );
};

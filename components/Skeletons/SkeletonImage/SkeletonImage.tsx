import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import { ISkeleton } from '../../interfaces';
import styles from './SkeletonImage.module.scss';

interface ISkeletonImage {
    height: string;
    width: string;
    rounded?: boolean;
    state?: Pick<ISkeleton, 'state'>;
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
                state && styles[state.toString()]
            )}
            style={inlineStyles}
        ></div>
    );
};

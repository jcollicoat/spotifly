import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import { ISkeleton } from '../../interfaces';
import styles from './SkeletonText.module.scss';

interface ISkeletonText {
    state?: Pick<ISkeleton, 'state'>;
    text?: string;
    width?: string;
}

export const SkeletonText: FC<ISkeletonText> = ({ state, text, width }) => {
    const inlineStyles: CSSProperties = {
        width,
    };

    const showText = text && !width;

    return (
        <span
            aria-hidden
            className={classNames(
                styles.skeleton,
                !state && styles.loading,
                state && styles[state.toString()],
                showText && styles.text
            )}
            style={inlineStyles}
        >
            {showText && text}
        </span>
    );
};

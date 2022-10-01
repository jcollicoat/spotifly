import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import { SkeletonStates } from '../../types';
import styles from './SkeletonText.module.scss';

interface ISkeletonText {
    state?: SkeletonStates;
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
                state && styles[state],
                showText && styles.text
            )}
            style={inlineStyles}
        >
            {showText && text}
        </span>
    );
};

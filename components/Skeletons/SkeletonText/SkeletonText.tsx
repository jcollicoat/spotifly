import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import styles from './SkeletonText.module.scss';

interface ISkeletonText {
    loading?: boolean;
    text?: string;
    width?: string;
}

export const SkeletonText: FC<ISkeletonText> = ({
    loading = false,
    text,
    width,
}) => {
    const inlineStyles: CSSProperties = {
        width,
    };

    const showText = text && !width;

    return (
        <span
            aria-hidden
            className={classNames(
                styles.skeleton,
                loading && styles.loading,
                showText && styles.text
            )}
            style={inlineStyles}
        >
            {showText && text}
        </span>
    );
};

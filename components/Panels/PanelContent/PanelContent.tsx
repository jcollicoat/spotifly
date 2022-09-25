import classNames from 'classnames';
import { FC } from 'react';
import styles from './PanelContent.module.scss';

interface IPanelContent {
    children: React.ReactNode;
    minHeight?: number;
    noPadding?: boolean;
}

export const PanelContent: FC<IPanelContent> = ({
    children,
    minHeight,
    noPadding,
}) => (
    <div
        className={classNames(styles.wrapper, noPadding && styles.nopadding)}
        style={{ minHeight: `${minHeight ? minHeight : 0}px` }}
    >
        {children}
    </div>
);

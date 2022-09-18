import { FC } from 'react';
import styles from './PanelContent.module.scss';

export interface IPanelContent {
    children: React.ReactNode;
    minHeight?: number;
}

export const PanelContent: FC<IPanelContent> = ({ children, minHeight }) => (
    <div
        className={styles.wrapper}
        style={{ minHeight: `${minHeight ? minHeight : 0}px` }}
    >
        {children}
    </div>
);

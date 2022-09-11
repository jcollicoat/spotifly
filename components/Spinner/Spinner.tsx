import classNames from 'classnames';
import { FC } from 'react';
import styles from './Spinner.module.scss';

type Padding = 'small' | 'medium' | 'large';

export const Spinner: FC<{ padding?: Padding }> = ({ padding }) => (
    <div className={classNames(styles.container, padding && styles[padding])}>
        <div aria-label="Loading..." className={styles.spinner} role="alert" />
    </div>
);

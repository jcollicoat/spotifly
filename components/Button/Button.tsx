import { FC } from 'react';
import styles from './Button.module.scss';

interface IButton {
    ariaLabel: string;
    onClick: () => void;
    text: string;
}

export const Button: FC<IButton> = ({ ariaLabel, onClick, text }) => (
    <button aria-label={ariaLabel} className={styles.button} onClick={onClick}>
        {text}
    </button>
);

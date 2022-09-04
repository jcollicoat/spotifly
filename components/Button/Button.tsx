import { FC } from 'react';
import styles from './Button.module.scss';

interface IButton {
    onClick: () => void;
    text: string;
}

export const Button: FC<IButton> = ({ onClick, text }) => (
    <button className={styles.button} onClick={onClick}>
        {text}
    </button>
);

import { FC } from 'react';
import { HiOutlineExclamation } from 'react-icons/hi';
import { Button, ButtonSignInOut } from '../Button/Button';
import styles from './Unauthenticated.module.scss';

export const Unauthenticated: FC = () => (
    <section className={styles.container}>
        <HiOutlineExclamation className={styles.icon} />
        <h1 className={styles.heading}>Not Logged In</h1>
        <p className={styles.body}>Please log in to Spotify to continue.</p>
        <div className={styles.buttons}>
            <ButtonSignInOut />
            <Button
                ariaLabel="Navigate home"
                href="/"
                style="secondary"
                type="link"
            >
                Go home
            </Button>
        </div>
    </section>
);

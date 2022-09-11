import { FC } from 'react';
import { HiOutlineExclamation } from 'react-icons/hi';
import { signInOrOut } from '../../lib/auth';
import { Button } from '../Button/Button';
import styles from './Unauthenticated.module.scss';

export const Unauthenticated: FC = () => (
    <section className={styles.container}>
        <HiOutlineExclamation className={styles.icon} />
        <h1 className={styles.heading}>Unauthenticated</h1>
        <p className={styles.body}>You are not logged in to Spotify.</p>
        <Button ariaLabel="Sign in" onClick={signInOrOut} text="Sign in" />
    </section>
);

import { useSession, signIn, signOut } from 'next-auth/react';
import { FC, useCallback } from 'react';
import { Button } from '../Button/Button';
import { SpotiflyLogo } from '../SpotiflyLogo/SpotiflyLogo';
import styles from './Header.module.scss';

export const Header: FC = () => {
    const { data: session } = useSession();

    const handleSignInOut = useCallback(() => {
        if (session) {
            signOut();
        }
        signIn();
    }, [session]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <SpotiflyLogo height={30} />
                    <nav className={styles.nav}>
                        <Button
                            onClick={handleSignInOut}
                            text={session ? 'Sign out' : 'Sign in'}
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
};

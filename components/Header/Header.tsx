import { useSession, signIn, signOut } from 'next-auth/react';
import { FC, useCallback, useMemo } from 'react';
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

    const buttonContent = useMemo(() => {
        return session ? 'Sign out' : 'Sign in';
    }, [session]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <SpotiflyLogo height={30} />
                    <nav className={styles.nav}>
                        <Button
                            ariaLabel={buttonContent}
                            onClick={handleSignInOut}
                            text={buttonContent}
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
};

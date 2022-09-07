import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FC, useCallback, useMemo } from 'react';
import { Button } from '../Button/Button';
import { SpotiflyLogo } from '../SpotiflyLogo/SpotiflyLogo';
import styles from './Header.module.scss';

export const Header: FC = () => {
    const { data: session } = useSession();

    const handleSignInOut = useCallback(() => {
        if (session) {
            signOut();
        } else {
            signIn('spotify');
        }
    }, [session]);

    const buttonContent = useMemo(() => {
        return session ? 'Sign out' : 'Sign in';
    }, [session]);

    return (
        <header className={styles.header}>
            <div className={styles.panel}>
                <div className={styles.content}>
                    <Link href="/" passHref>
                        <a aria-label="Navigate home">
                            <SpotiflyLogo height={20} />
                        </a>
                    </Link>
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

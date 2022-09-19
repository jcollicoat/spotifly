import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { signInOrOut } from '../../lib/auth';
import { Button } from '../Button/Button';
import { Panel } from '../Panels/Panel/Panel';
import { SpotiflyLogo } from '../SpotiflyLogo/SpotiflyLogo';
import styles from './Header.module.scss';

export const Header: FC = () => {
    const { data: session } = useSession();

    const signInButtonContent = session ? 'Sign out' : 'Sign in';

    return (
        <header className={styles.header}>
            <Panel>
                <div className={styles.content}>
                    <Link href="/" passHref>
                        <a aria-label="Navigate home">
                            <SpotiflyLogo height={20} />
                        </a>
                    </Link>
                    <nav className={styles.nav}>
                        <Button
                            ariaLabel="Navigate home"
                            href="/"
                            style="tertiary"
                            type="link"
                        >
                            Home
                        </Button>
                        <Button
                            ariaLabel="Navigate to your dashboard"
                            href="/dashboard"
                            style="secondary"
                            type="link"
                        >
                            Dashboard
                        </Button>
                        <Button
                            ariaLabel={signInButtonContent}
                            onClick={signInOrOut}
                        >
                            {signInButtonContent}
                        </Button>
                    </nav>
                </div>
            </Panel>
        </header>
    );
};

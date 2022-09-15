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

    const buttonContent = session ? 'Sign out' : 'Sign in';

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
                            ariaLabel={buttonContent}
                            onClick={signInOrOut}
                            text={buttonContent}
                        />
                    </nav>
                </div>
            </Panel>
        </header>
    );
};

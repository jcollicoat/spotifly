import Link from 'next/link';
import { FC } from 'react';
import { Button } from '../Button/Button';
import { Panel } from '../Panels/Panel/Panel';
import { SpotiflyLogo } from '../SpotiflyLogo/SpotiflyLogo';
import styles from './Header.module.scss';

export const Header: FC = () => (
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
                        style="tertiary"
                        type="link"
                    >
                        Dashboard
                    </Button>
                    <Button type="signInOut" />
                </nav>
            </div>
        </Panel>
    </header>
);

import Link from 'next/link';
import { FC } from 'react';
import { Button, ButtonSignInOut } from '../Button/Button';
import { Icon } from '../Icons/Icon';
import { Panel } from '../Panels/_Bases/Panel/Panel';
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
                        smallGlyph={<Icon type="Home" />}
                        style="tertiary"
                        type="link"
                    >
                        Home
                    </Button>
                    <Button
                        ariaLabel="Navigate to your dashboard"
                        href="/dashboard"
                        smallGlyph={<Icon type="Dashboard" />}
                        style="tertiary"
                        type="link"
                    >
                        Dashboard
                    </Button>
                    <ButtonSignInOut showSmallGlyph={true} />
                </nav>
            </div>
        </Panel>
    </header>
);

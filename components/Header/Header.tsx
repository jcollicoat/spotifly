import Link from 'next/link';
import { FC } from 'react';
import { Button, ButtonSignInOut } from '../Button/Button';
import { Glyph } from '../Glyphs/Glyph';
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
                        glyph={<Glyph type="Home" />}
                        showGlyph="responsive"
                        style="tertiary"
                        type="link"
                    >
                        Home
                    </Button>
                    <Button
                        ariaLabel="Navigate to your dashboard"
                        href="/dashboard"
                        glyph={<Glyph type="Dashboard" />}
                        showGlyph="responsive"
                        style="tertiary"
                        type="link"
                    >
                        Dashboard
                    </Button>
                    <ButtonSignInOut showGlyph="responsive" />
                </nav>
            </div>
        </Panel>
    </header>
);

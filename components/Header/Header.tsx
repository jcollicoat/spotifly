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
                <Link aria-label="Navigate home" href="/">
                    <SpotiflyLogo height={20} />
                </Link>
                <nav className={styles.nav}>
                    <Button
                        ariaLabel="Navigate home"
                        displayAsGlyph="responsive"
                        href="/"
                        glyph={<Glyph type="Home" />}
                        style="tertiary"
                        type="link"
                    >
                        Home
                    </Button>
                    <Button
                        ariaLabel="Navigate to your dashboard"
                        displayAsGlyph="responsive"
                        href="/dashboard"
                        glyph={<Glyph type="Dashboard" />}
                        style="tertiary"
                        type="link"
                    >
                        Dashboard
                    </Button>
                    <ButtonSignInOut displayAsGlyph="responsive" />
                </nav>
            </div>
        </Panel>
    </header>
);

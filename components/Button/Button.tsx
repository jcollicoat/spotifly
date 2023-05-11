import classNames from 'classnames';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { useMedia } from 'react-use';
import { mediaQueries } from '../../context/breakpoints/breakpoints';
import { signInOrOut } from '../../lib/_auth/client';
import { Glyph } from '../Glyphs/Glyph';
import styles from './Button.module.scss';

interface Button {
    ariaLabel: string;
    children: React.ReactNode;
    displayGlyph?: 'prefix' | 'postfix' | 'always' | 'mobile';
    style?: 'cta' | 'primary' | 'secondary' | 'tertiary';
    glyph?: React.ReactNode;
}

interface ButtonPropsForButton extends Button {
    onClick: () => void;
    href?: never;
}

interface ButtonPropsForLink extends Button {
    href: string;
    onClick?: never;
}

export type ButtonProps = ButtonPropsForButton | ButtonPropsForLink;

const ButtonContent: FC<ButtonProps> = (props) => {
    const isMobile = useMedia(mediaQueries.mobile, false);
    const { children, displayGlyph, glyph } = props;

    if (!displayGlyph) {
        return <>{children}</>;
    }
    if (displayGlyph === 'always' || (displayGlyph === 'mobile' && isMobile)) {
        return <>{glyph}</>;
    }
    return (
        <>
            {displayGlyph === 'prefix' && glyph}
            {children}
            {displayGlyph === 'postfix' && glyph}
        </>
    );
};

export const Button: FC<ButtonProps> = (props) => {
    const { ariaLabel, href, onClick, style = 'secondary' } = props;

    if (onClick) {
        return (
            <button
                aria-label={ariaLabel}
                className={classNames(styles.button, styles[style])}
                onClick={onClick}
                type="button"
            >
                <ButtonContent {...props} />
            </button>
        );
    }

    return href.startsWith('https://') ? (
        <a
            aria-label={ariaLabel}
            className={classNames(styles.button, styles[style])}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
        >
            <ButtonContent {...props} />
        </a>
    ) : (
        <Link href={href}>
            <ButtonContent {...props} />
        </Link>
    );
};

export const ButtonSignInOut: FC<Button> = ({ displayGlyph, style }) => {
    const { data: session } = useSession();

    return (
        <Button
            ariaLabel={session ? 'Sign out' : 'Sign in with Spotify'}
            onClick={signInOrOut}
            glyph={<Glyph type="SignInOut" signout={Boolean(session)} />}
            displayGlyph={displayGlyph}
            style={style ?? (session ? 'secondary' : 'primary')}
        >
            {session ? 'Sign out' : 'Sign in with Spotify'}
        </Button>
    );
};

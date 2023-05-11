import classNames from 'classnames';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FC, useCallback } from 'react';
import { useMedia } from 'react-use';
import { breakpoints } from '../../context/breakpoints/breakpoints';
import { signInOrOut } from '../../lib/_auth/client';
import { Glyph } from '../Glyphs/Glyph';
import styles from './Button.module.scss';

interface Button {
    displayGlyph?: 'prefix' | 'postfix' | 'always' | 'mobile';
    style?: 'cta' | 'primary' | 'secondary' | 'tertiary';
}

interface ButtonWithChildren extends Button {
    ariaLabel: string;
    children: React.ReactNode;
    glyph?: React.ReactNode;
}

interface ButtonTypeProps extends ButtonWithChildren {
    onClick: () => void;
}

const ButtonType: FC<ButtonTypeProps> = ({
    ariaLabel,
    children,
    onClick,
    style = 'cta',
}) => (
    <button
        aria-label={ariaLabel}
        className={classNames(styles.button, styles[style])}
        onClick={onClick}
        type="button"
    >
        {children}
    </button>
);

interface LinkTypeProps extends ButtonWithChildren {
    href: string;
}

const LinkType: FC<LinkTypeProps> = ({
    ariaLabel,
    children,
    href,
    style = 'cta',
}) => {
    if (href.startsWith('https://')) {
        return (
            <a
                aria-label={ariaLabel}
                className={classNames(styles.button, styles[style])}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
            >
                {children}
            </a>
        );
    } else {
        return <Link href={href}>{children}</Link>;
    }
};

interface ButtonPropsForButton extends ButtonWithChildren {
    onClick: () => void;
    href?: never;
}

interface ButtonPropsForLink extends ButtonWithChildren {
    href: string;
    onClick?: never;
}

type ButtonProps = ButtonPropsForButton | ButtonPropsForLink;

export const Button: FC<ButtonProps> = ({
    ariaLabel,
    children,
    displayGlyph,
    glyph,
    href,
    onClick,
    style,
}) => {
    const isSmall = useMedia(`(max-width: ${breakpoints.medium - 1}px)`, false);

    const buttonContent = useCallback(() => {
        switch (displayGlyph) {
            case 'prefix':
            case 'postfix':
                return (
                    <>
                        {displayGlyph === 'prefix' ? glyph : children}
                        {displayGlyph === 'postfix' ? glyph : children}
                    </>
                );
            case 'always':
                return glyph;
            case 'mobile':
                return isSmall ? glyph : children;
            default:
                return children;
        }
    }, [children, displayGlyph, glyph, isSmall]);

    if (onClick) {
        return (
            <ButtonType ariaLabel={ariaLabel} onClick={onClick} style={style}>
                {buttonContent()}
            </ButtonType>
        );
    } else {
        return (
            <LinkType ariaLabel={ariaLabel} href={href} style={style}>
                {buttonContent()}
            </LinkType>
        );
    }
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

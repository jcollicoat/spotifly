import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { useMedia } from 'react-use';
import { breakpoints } from '../../context/breakpoints/breakpoints';
import { signInOrOut } from '../../lib/auth/client';
import { Glyph } from '../Glyphs/Glyph';
import styles from './Button.module.scss';

interface IButton {
    displayAsGlyph?: 'always' | 'responsive';
    style?: 'primary' | 'secondary' | 'tertiary';
}

interface IButtonWithChildren extends IButton {
    ariaLabel: string;
    children: React.ReactNode;
    glyph?: React.ReactNode;
}

interface IButtonType extends IButtonWithChildren {
    onClick: () => void;
}

const ButtonType: FC<IButtonType> = ({
    ariaLabel,
    children,
    onClick,
    style = 'primary',
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

interface ILinkType extends IButtonWithChildren {
    href: string;
}

const LinkType: FC<ILinkType> = ({
    ariaLabel,
    children,
    href,
    style = 'primary',
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
        return (
            <Link href={href} passHref>
                <a
                    aria-label={ariaLabel}
                    className={classNames(styles.button, styles[style])}
                >
                    {children}
                </a>
            </Link>
        );
    }
};

interface IButtonTypeProps extends IButtonWithChildren {
    onClick: () => void;
    href?: never;
    type?: never;
}

interface ILinkTypeProps extends IButtonWithChildren {
    href: string;
    type: 'link';
    onClick?: never;
}

type IButtonProps = IButtonTypeProps | ILinkTypeProps;

export const Button: FC<IButtonProps> = ({
    ariaLabel,
    children,
    displayAsGlyph,
    glyph,
    href,
    onClick,
    style,
    type,
}) => {
    const isSmall = useMedia(`(max-width: ${breakpoints.medium - 1}px)`, false);
    const buttonContent = () => {
        if (
            displayAsGlyph === 'always' ||
            (displayAsGlyph === 'responsive' && isSmall)
        ) {
            return glyph;
        } else {
            return children;
        }
    };

    if (type === 'link') {
        return (
            <LinkType ariaLabel={ariaLabel} href={href} style={style}>
                {buttonContent()}
            </LinkType>
        );
    }
    return (
        <ButtonType ariaLabel={ariaLabel} onClick={onClick} style={style}>
            {buttonContent()}
        </ButtonType>
    );
};

export const ButtonSignInOut: FC<IButton> = ({ displayAsGlyph, style }) => {
    const { data: session } = useSession();
    const glyph = displayAsGlyph && (
        <Glyph type="SignInOut" signout={Boolean(session)} />
    );

    return (
        <Button
            ariaLabel={session ? 'Sign out' : 'Sign in with Spotify'}
            onClick={signInOrOut}
            glyph={glyph}
            displayAsGlyph={displayAsGlyph}
            style={style ?? (session ? 'secondary' : 'primary')}
        >
            {session ? 'Sign out' : 'Sign in with Spotify'}
        </Button>
    );
};

import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { HiLogin, HiLogout } from 'react-icons/hi';
import { useMedia } from 'react-use';
import { breakpoints } from '../../context/breakpoints/breakpoints';
import { signInOrOut } from '../../lib/auth';
import styles from './Button.module.scss';

interface IButton {
    style?: 'primary' | 'secondary' | 'tertiary';
}

interface IButtonWithChildren extends IButton {
    ariaLabel: string;
    children: React.ReactNode;
    smallGlyph?: React.ReactNode;
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
}) => (
    <Link href={href} passHref>
        <a
            aria-label={ariaLabel}
            className={classNames(styles.button, styles[style])}
        >
            {children}
        </a>
    </Link>
);

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
    href,
    onClick,
    smallGlyph,
    style,
    type,
}) => {
    const isSmall = useMedia(`(max-width: ${breakpoints.medium - 1}px)`, false);
    const showSmallGlyph = isSmall && Boolean(smallGlyph);

    if (type === 'link') {
        return (
            <LinkType ariaLabel={ariaLabel} href={href} style={style}>
                {showSmallGlyph ? smallGlyph : children}
            </LinkType>
        );
    }
    return (
        <ButtonType ariaLabel={ariaLabel} onClick={onClick} style={style}>
            {showSmallGlyph ? smallGlyph : children}
        </ButtonType>
    );
};

interface ISignInOutProps extends IButton {
    showSmallGlyph?: boolean;
}

export const ButtonSignInOut: FC<ISignInOutProps> = ({
    showSmallGlyph = false,
    style,
}) => {
    const { data: session } = useSession();
    const smallGlyph = showSmallGlyph && (session ? <HiLogout /> : <HiLogin />);

    return (
        <Button
            ariaLabel={session ? 'Sign out' : 'Sign in with Spotify'}
            onClick={signInOrOut}
            smallGlyph={smallGlyph}
            style={style ?? (session ? 'secondary' : 'primary')}
        >
            {session ? 'Sign out' : 'Sign in with Spotify'}
        </Button>
    );
};

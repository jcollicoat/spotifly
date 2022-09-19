import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { signInOrOut } from '../../lib/auth';
import styles from './Button.module.scss';

interface IButton {
    style?: 'primary' | 'secondary' | 'tertiary';
}

interface IButtonWithChildren extends IButton {
    ariaLabel: string;
    children: React.ReactNode;
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

const SignInOutType: FC<IButton> = ({ style }) => {
    const { data: session } = useSession();
    return (
        <ButtonType
            ariaLabel={session ? 'Sign out' : 'Sign in with Spotify'}
            onClick={signInOrOut}
            style={style ?? (session ? 'secondary' : 'primary')}
        >
            {session ? 'Sign out' : 'Sign in with Spotify'}
        </ButtonType>
    );
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

interface ISignInOutTypeProps extends IButton {
    ariaLabel?: never;
    children?: never;
    type: 'signInOut';
    onClick?: never;
    href?: never;
}

type IButtonProps = IButtonTypeProps | ILinkTypeProps | ISignInOutTypeProps;

export const Button: FC<IButtonProps> = ({
    ariaLabel,
    children,
    href,
    onClick,
    style,
    type,
}) => {
    if (type === 'signInOut') {
        return <SignInOutType style={style} />;
    } else if (type === 'link') {
        return (
            <LinkType ariaLabel={ariaLabel} href={href} style={style}>
                {children}
            </LinkType>
        );
    }
    return (
        <ButtonType ariaLabel={ariaLabel} onClick={onClick} style={style}>
            {children}
        </ButtonType>
    );
};

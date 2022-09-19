import classNames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Button.module.scss';

interface IShared {
    ariaLabel: string;
    children: React.ReactNode;
    style?: 'primary' | 'secondary' | 'tertiary';
}

interface IButtonType extends IShared {
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

interface ILinkType extends IShared {
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

interface IButtonTypeProps extends IShared {
    onClick: () => void;
    href?: never;
    type?: never;
}

interface ILinkTypeProps extends IShared {
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
    style,
    type,
}) => {
    if (type === 'link') {
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

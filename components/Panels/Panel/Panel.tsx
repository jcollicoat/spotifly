import classNames from 'classnames';
import { FC } from 'react';
import { useMediaQueries } from '../../../hooks/useMediaQueries';
import { IPanelHeading, PanelHeading } from '../PanelHeading/PanelHeading';
import styles from './Panel.module.scss';

type PanelWidth = 'third' | 'half' | 'full';

export interface IPanelDisplay {
    width: {
        small: PanelWidth;
        medium: PanelWidth;
        large: PanelWidth;
    };
}

interface IPanel {
    children: React.ReactNode;
    display: IPanelDisplay;
    heading?: IPanelHeading;
}

export const Panel: FC<IPanel> = ({ children, display, heading }) => {
    const panelWidth = useMediaQueries(
        [
            {
                matches: (breakpoints) => breakpoints.large,
                value: display.width.large,
            },
            {
                matches: (breakpoints) => breakpoints.medium,
                value: display.width.medium,
            },
        ],
        display.width.small
    );

    return (
        <section className={classNames(styles.panel, styles[panelWidth])}>
            {heading && <PanelHeading {...heading} />}
            {children}
        </section>
    );
};

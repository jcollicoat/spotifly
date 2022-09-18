import classNames from 'classnames';
import { FC } from 'react';
import { useMediaQueries } from '../../../hooks/useMediaQueries';
import { PanelContent } from '../PanelContent/PanelContent';
import { IPanelHeading, PanelHeading } from '../PanelHeading/PanelHeading';
import styles from './Panel.module.scss';

type PanelWidth = 'third' | 'half' | 'full';

export interface IPanelDisplay {
    minHeight?: number;
    width: {
        small: PanelWidth;
        medium?: PanelWidth;
        large?: PanelWidth;
    };
}

interface IPanel {
    children: React.ReactNode;
    display?: IPanelDisplay;
    heading?: IPanelHeading;
}

const defaultDisplaySettings: IPanelDisplay = {
    minHeight: 0,
    width: { small: 'full' },
};

export const Panel: FC<IPanel> = ({
    children,
    display = defaultDisplaySettings,
    heading,
}) => {
    const panelMinHeight = display.minHeight ?? 0;

    const panelWidth = useMediaQueries(
        [
            {
                matches: (breakpoints) => breakpoints.large,
                value:
                    display.width.large ??
                    display.width.medium ??
                    display.width.small,
            },
            {
                matches: (breakpoints) => breakpoints.medium,
                value: display.width.medium ?? display.width.small,
            },
        ],
        display.width.small
    );

    return (
        <section className={classNames(styles.panel, styles[panelWidth])}>
            {heading && <PanelHeading {...heading} />}
            <PanelContent minHeight={panelMinHeight}>{children}</PanelContent>
        </section>
    );
};

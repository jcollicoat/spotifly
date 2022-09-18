import { FC } from 'react';
import { useMediaQueries } from '../../../hooks/useMediaQueries';
import { PanelContent } from '../PanelContent/PanelContent';
import { IPanelHeading, PanelHeading } from '../PanelHeading/PanelHeading';
import styles from './Panel.module.scss';

export interface IPanelDisplay {
    area?: string;
    minHeight?: number;
}

interface IPanel {
    children: React.ReactNode;
    display?: IPanelDisplay;
    heading?: IPanelHeading;
}

const defaultDisplaySettings: IPanelDisplay = {
    minHeight: 0,
};

export const Panel: FC<IPanel> = ({
    children,
    display = defaultDisplaySettings,
    heading,
}) => {
    // const panelArea = display.area;
    const panelArea = useMediaQueries(
        [
            {
                matches: (breakpoints) => breakpoints.medium,
                value: display.area ?? '',
            },
        ],
        ''
    );
    const panelMinHeight = display.minHeight ?? 0;

    return (
        <section
            className={styles.panel}
            style={{ gridArea: panelArea ? panelArea : '' }}
        >
            {heading && <PanelHeading {...heading} />}
            <PanelContent minHeight={panelMinHeight}>{children}</PanelContent>
        </section>
    );
};

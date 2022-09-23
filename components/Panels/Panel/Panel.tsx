import { FC } from 'react';
import { useMediaQueries } from '../../../hooks/useMediaQueries';
import { PanelContent } from '../PanelContent/PanelContent';
import { IPanelHeading, PanelHeading } from '../PanelHeading/PanelHeading';
import styles from './Panel.module.scss';

export interface IPanelDisplay {
    area?: string;
    minHeight?: number;
    noPadding?: boolean;
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
    const noPadding = display.noPadding;

    return (
        <section
            className={styles.panel}
            style={panelArea ? { gridArea: panelArea } : {}}
        >
            {heading && <PanelHeading {...heading} />}
            <PanelContent minHeight={panelMinHeight} noPadding={noPadding}>
                {children}
            </PanelContent>
        </section>
    );
};

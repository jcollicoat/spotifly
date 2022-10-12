import { FC } from 'react';
import { useRecentlyPlayed, useTopTracks } from '../../hooks/useSpotify';
import { appendUUID } from '../../lib/_helpers/helpers';
import { ITrack } from '../../lib/tracks/types';
import { ListTrack } from '../ListTrack/ListTrack';
import { ICreatePanel, SkeletonStates } from '../types';
import { IPanelDisplay, Panel } from './_Bases/Panel/Panel';
import {
    HeadingLevel,
    IPanelHeading,
} from './_Bases/PanelHeading/PanelHeading';

type ComponentTypes = 'recently-played' | 'top-tracks';

interface ITracksListPanel extends ICreatePanel {
    list: ComponentTypes;
    subheading: string;
    subheadingLevel?: HeadingLevel;
    title?: string;
}

export const TrackList: FC<ITracksListPanel> = ({
    list,
    subheading,
    subheadingLevel,
    title,
    isSkeleton,
}) => {
    const mapQueryType = () => {
        switch (list) {
            case 'recently-played':
                return useRecentlyPlayed;
            case 'top-tracks':
                return useTopTracks;
        }
    };
    const query = mapQueryType();
    const { data, isError, isLoading } = query();

    // TODO: Fix this ugly ass code
    const mapTracks = (tracks?: ITrack[] | SkeletonStates) => {
        if (!tracks || isSkeleton) {
            return new Array(20)
                .fill('')
                .map(() => <ListTrack key={appendUUID('')} />);
        } else if (tracks === 'warning' || tracks === 'error') {
            return new Array(20)
                .fill('')
                .map(() => <ListTrack key={appendUUID('')} state={tracks} />);
        } else {
            return tracks.map((track) => (
                <ListTrack key={track.key} data={track} />
            ));
        }
    };

    const heading: IPanelHeading = {
        subheading: subheading,
        subheadingLevel: subheadingLevel,
        title: title,
        titleLarge: true,
    };

    const display: IPanelDisplay = {
        area: list,
        minHeight: isLoading ? 1475 : undefined,
    };

    return (
        <Panel display={display} heading={heading}>
            {isLoading && mapTracks()}
            {isError && mapTracks('error')}
            {data && mapTracks(data.items)}
        </Panel>
    );
};

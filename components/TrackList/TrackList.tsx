import { FC } from 'react';
import { useRecentlyPlayed, useTopTracks } from '../../hooks/useSpotify';
import { appendUUID } from '../../lib/helpers';
import { ITrack } from '../../lib/types/spotify';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { IPanelHeading } from '../Panels/PanelHeading/PanelHeading';
import { ICreatePanel, SkeletonStates } from '../types';
import { Track, TrackSkeleton } from './Track/Track';

type ComponentTypes = 'recently-played' | 'top-tracks';

interface ITracksListPanel extends ICreatePanel {
    list: ComponentTypes;
    subheading: string;
    title: string;
}

export const TrackList: FC<ITracksListPanel> = ({
    list,
    subheading,
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
                .map(() => <TrackSkeleton key={appendUUID('')} />);
        } else if (tracks === 'warning' || tracks === 'error') {
            return new Array(20)
                .fill('')
                .map(() => (
                    <TrackSkeleton key={appendUUID('')} state={tracks} />
                ));
        } else {
            return tracks.map((track) => (
                <Track key={track.key} track={track} />
            ));
        }
    };

    const heading: IPanelHeading = {
        subheading: subheading,
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

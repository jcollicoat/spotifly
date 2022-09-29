import { FC } from 'react';
import { useRecentlyPlayed, useTopTracks } from '../../hooks/useSpotify';
import { appendUUID } from '../../lib/helpers';
import { ITrack } from '../../lib/interfaces/spotify';
import { SkeletonStates } from '../interfaces';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { IPanelHeading } from '../Panels/PanelHeading/PanelHeading';
import { Track } from './Track/Track';
import { TrackSkeleton } from './Track/TrackSkeleton';

type ComponentTypes = 'recently-played' | 'top-tracks';

interface ITracksList {
    subheading: string;
    title: string;
    type: ComponentTypes;
    isSkeleton?: boolean;
}

export const TrackList: FC<ITracksList> = ({
    subheading,
    title,
    type,
    isSkeleton,
}) => {
    const mapQueryType = () => {
        switch (type) {
            case 'recently-played':
                return useRecentlyPlayed;
            case 'top-tracks':
                return useTopTracks;
        }
    };
    const query = mapQueryType();
    const { data, isError, isLoading } = query();

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
        title: title,
        subheading: subheading,
    };

    const display: IPanelDisplay = {
        area: type,
        minHeight: isLoading ? 1475 : undefined,
        noPadding: true,
    };

    return (
        <Panel display={display} heading={heading}>
            {isLoading && mapTracks()}
            {isError && mapTracks('error')}
            {data && mapTracks(data.items)}
        </Panel>
    );
};

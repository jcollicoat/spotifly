import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getRecentlyPlayedSingle } from '../../lib/client/api';
import { IRecentlyPlayed } from '../../lib/tracks/types';
import { FeaturedTrack } from '../Tracks/FeaturedTrack/FeaturedTrack';
import { ICreatePanel } from '../types';
import { IPanelDisplay, Panel } from './_Bases/Panel/Panel';
import {
    HeadingLevel,
    IPanelHeading,
} from './_Bases/PanelHeading/PanelHeading';

interface ILastPlayedTrack extends ICreatePanel {
    subheading?: string;
    subheadingLevel?: HeadingLevel;
    title?: string;
}

export const LastPlayedTrack: FC<ILastPlayedTrack> = ({
    subheading,
    subheadingLevel,
    title,
    isSkeleton,
}) => {
    const { data: track, isLoading } = useQuery<IRecentlyPlayed>(
        ['last-played'],
        getRecentlyPlayedSingle,
        {
            staleTime: Infinity,
        }
    );

    const heading: IPanelHeading = {
        title: title,
        subheading: subheading,
        subheadingLevel: subheadingLevel,
    };

    const display: IPanelDisplay = {
        area: 'last-played',
    };

    if (isSkeleton || !track) {
        return (
            <Panel display={display} heading={heading}>
                {(isLoading || isSkeleton) && <FeaturedTrack />}
            </Panel>
        );
    } else {
        return (
            <Panel display={display} heading={heading}>
                <FeaturedTrack data={track.items[0]} />
            </Panel>
        );
    }
};

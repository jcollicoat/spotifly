import { FC } from 'react';
import { useRecentlyPlayed, useTopTracks } from '../../hooks/useReactQueries';
import {
    IRecentlyPlayedDTO,
    IRecentlyPlayedTrackDTO,
    ITopTracksDTO,
    ITrackDTO,
} from '../../lib/interfaces/spotify';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { IPanelHeading } from '../Panels/PanelHeading/PanelHeading';
import { Spinner } from '../Spinner/Spinner';
import { Track } from './Track/Track';

type ComponentTypes = 'recently-played' | 'top-tracks';

type DataTypes = IRecentlyPlayedDTO | ITopTracksDTO;

interface IList<T> {
    items: T[];
}

const RecentlyPlayed: FC<IList<IRecentlyPlayedTrackDTO>> = ({ items }) => {
    return (
        <>
            {items.map((item) => (
                <Track key={item.track.id} track={item.track} />
            ))}
        </>
    );
};

const TopTracks: FC<IList<ITrackDTO>> = ({ items }) => {
    return (
        <>
            {items.map((item) => (
                <Track key={item.id} track={item} />
            ))}
        </>
    );
};

interface ITracksList {
    subheading: string;
    title: string;
    type: ComponentTypes;
}

export const TrackList: FC<ITracksList> = ({ subheading, title, type }) => {
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

    const mapTracks = (data: DataTypes) => {
        switch (type) {
            case 'recently-played':
                return (
                    <RecentlyPlayed
                        items={data.items as IRecentlyPlayedTrackDTO[]}
                    />
                );
            case 'top-tracks':
                return <TopTracks items={data.items as ITrackDTO[]} />;
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
            {isLoading && <Spinner padding="small" />}
            {isError && <div>An error occured.</div>}
            {data && mapTracks(data)}
        </Panel>
    );
};

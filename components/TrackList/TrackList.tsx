import { FC } from 'react';
import { useRecentlyPlayed, useTopTracks } from '../../hooks/useSpotify';
import { ITrack } from '../../lib/interfaces/spotify';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { IPanelHeading } from '../Panels/PanelHeading/PanelHeading';
import { Spinner } from '../Spinner/Spinner';
import { Track } from './Track/Track';

type ComponentTypes = 'recently-played' | 'top-tracks';

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

    const mapTracks = (tracks: ITrack[]) =>
        tracks.map((track) => <Track key={track.unique_id} track={track} />);

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
            {data && mapTracks(data.items)}
        </Panel>
    );
};

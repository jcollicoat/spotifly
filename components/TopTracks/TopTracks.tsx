import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { TimeConstants } from '../../lib/constants';
import { ITopTracksDTO } from '../../lib/interfaces/spotify';
import { getTopTracks } from '../../lib/spotify';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { IPanelHeading } from '../Panels/PanelHeading/PanelHeading';
import { Spinner } from '../Spinner/Spinner';
import { TopTrack } from '../TopTrack/TopTrack';

export const TopTracks: FC = () => {
    const {
        data: topTracks,
        isError,
        isLoading,
    } = useQuery<ITopTracksDTO>(['topTracks'], getTopTracks, {
        staleTime: TimeConstants.HourMS,
    });

    const heading: IPanelHeading = {
        heading: 'Top Tracks',
        subheading: 'Last 6 months',
    };

    const display: IPanelDisplay = {
        width: {
            small: 'full',
            medium: 'half',
            large: 'third',
        },
    };

    return (
        <Panel display={display} heading={heading}>
            {isLoading && <Spinner padding="small" />}
            {isError && <div>An error occured.</div>}
            {topTracks &&
                topTracks.items.map((track) => (
                    <TopTrack key={track.id} track={track} />
                ))}
        </Panel>
    );
};

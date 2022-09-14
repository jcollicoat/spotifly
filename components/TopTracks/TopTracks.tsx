import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { ITopTracksDTO } from '../../lib/interfaces/spotify';
import { getTopTracks } from '../../lib/spotify';
import { PanelHeading } from '../PanelHeading/PanelHeading';
import { Spinner } from '../Spinner/Spinner';
import { TopTrack } from '../TopTrack/TopTrack';
import styles from './TopTracks.module.scss';

export const TopTracks: FC = () => {
    const {
        data: topTracks,
        isError,
        isLoading,
    } = useQuery<ITopTracksDTO>(['topTracks'], getTopTracks, {
        staleTime: 3600000, // 1 hour
    });

    return (
        <section className={styles.panel}>
            <PanelHeading heading="Top Tracks" subheading="Last 6 months" />
            {isLoading && <Spinner padding="small" />}
            {isError && <div>An error occured.</div>}
            {topTracks &&
                topTracks.items.map((track) => (
                    <TopTrack key={track.id} track={track} />
                ))}
        </section>
    );
};

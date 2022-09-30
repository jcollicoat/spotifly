import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrack } from '../../lib/interfaces/spotify';
import { getRecentlyPlayedTrack } from '../../lib/spotify';
import { IComponent, ICreatePanel, ITrackComponentBase } from '../interfaces';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { IPanelHeading } from '../Panels/PanelHeading/PanelHeading';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import styles from './TrackFeature.module.scss';

type TrackFeatureSkeleton = IComponent<ITrackComponentBase>;

const TrackFeatureSkeleton: FC<TrackFeatureSkeleton> = ({ data, state }) => (
    <div
        className={styles.track}
        style={{
            backgroundColor: data && data.albumColor,
        }}
    >
        <div className={classNames(styles.content)}>
            <div className={styles.cover}>
                {data ? (
                    <Image
                        src={data.track.album.image}
                        alt=""
                        height={36}
                        width={36}
                    />
                ) : (
                    <SkeletonImage height="36px" width="36px" state={state} />
                )}
            </div>
            <div className={styles.details}>
                <div className={styles.nowrap}>
                    {data ? (
                        <Link href={`/track/${data.track.id}`} passHref>
                            <a
                                aria-label={`Explore ${data.track.name} by ${data.track.artists[0].name}`}
                                className={styles.name}
                            >
                                {data.track.name}
                            </a>
                        </Link>
                    ) : (
                        <a aria-hidden className={styles.name}>
                            <SkeletonText state={state} />
                        </a>
                    )}
                    <div className={styles.subdetails}>
                        {data ? (
                            <Link
                                href={`/artist/${data.track.artists[0].id}`}
                                passHref
                            >
                                <a className={styles.subdetail}>
                                    {data.track.artists[0].name}
                                </a>
                            </Link>
                        ) : (
                            <a className={styles.subdetail}>
                                <SkeletonText state={state} />
                            </a>
                        )}
                        •
                        {data ? (
                            <Link
                                href={`/album/${data.track.album.id}`}
                                passHref
                            >
                                <a className={styles.subdetail}>
                                    {data.track.album.name}
                                </a>
                            </Link>
                        ) : (
                            <a className={styles.subdetail}>
                                <SkeletonText state={state} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

type ComponentTypes = 'recently-played' | 'top-tracks';

interface ITrackFeaturePanel extends ICreatePanel {
    track: ComponentTypes;
    subheading?: string;
    title?: string;
}

export const TrackFeature: FC<ITrackFeaturePanel> = ({
    subheading,
    title,
    isSkeleton,
}) => {
    const {
        data: track,
        isError,
        isLoading,
    } = useQuery<ITrack>(['track-feature'], getRecentlyPlayedTrack, {
        staleTime: Infinity,
    });

    console.log(track);

    const heading: IPanelHeading = {
        title: title,
        subheading: subheading,
    };

    const display: IPanelDisplay = {
        area: 'track-feature',
    };

    return (
        <Panel display={display} heading={heading}>
            {(isLoading || isError || isSkeleton) && <TrackFeatureSkeleton />}
            {track && <TrackFeatureSkeleton data={{ track: track }} />}
        </Panel>
    );
};

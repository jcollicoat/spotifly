import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { getRecentlyPlayedSingle } from '../../lib/client/spotify';
import {
    IRecentlyPlayed,
    ISmallListTrack,
} from '../../lib/client/spotify-types';
import { IPanelDisplay, Panel } from '../Panels/_Bases/Panel/Panel';
import { IPanelHeading } from '../Panels/_Bases/PanelHeading/PanelHeading';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import { IComponent, ICreatePanel, ITrackComponentBase } from '../types';
import styles from './TrackFeature.module.scss';

interface ITrackFeatureSkeleton extends ITrackComponentBase {
    detailsRef: React.RefObject<HTMLDivElement>;
    noWrapRef: React.RefObject<HTMLDivElement>;
    isOverflowed?: boolean;
}

type TrackFeatureSkeleton = IComponent<ITrackFeatureSkeleton>;

const TrackFeatureSkeleton: FC<TrackFeatureSkeleton> = ({ data, state }) => (
    <div className={styles.track}>
        <div
            className={classNames(
                styles.content,
                data?.isOverflowed && styles.overflowed
            )}
        >
            <div className={styles.cover}>
                {data ? (
                    <Image
                        src={data.track.image}
                        alt=""
                        height={120}
                        width={120}
                    />
                ) : (
                    <SkeletonImage height="120px" width="120px" state={state} />
                )}
            </div>
            <div className={styles.details} ref={data?.detailsRef}>
                <div className={styles.nowrap} ref={data?.noWrapRef}>
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
    const { data: track, isLoading } = useQuery<
        IRecentlyPlayed<ISmallListTrack>
    >(['track-feature'], getRecentlyPlayedSingle, {
        staleTime: Infinity,
    });

    const heading: IPanelHeading = {
        title: title,
        subheading: subheading,
    };

    const display: IPanelDisplay = {
        area: 'track-feature',
    };

    const detailsRef = useRef<HTMLDivElement>(null);
    const noWrapRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [isOverflowed, setIsOverflowed] = useState(false);

    const measureOverflow = (): void => {
        const detailsWidth = detailsRef.current?.clientWidth;
        const noWrapWidth = noWrapRef.current?.clientWidth;

        if (!detailsWidth || !noWrapWidth) {
            setIsOverflowed(false);
        } else if (detailsWidth > noWrapWidth) {
            setIsOverflowed(false);
        } else if (detailsWidth < noWrapWidth) {
            setIsOverflowed(true);
        }
    };

    useEffect(() => {
        measureOverflow();
    }, [width]);

    useEffect(() => {
        measureOverflow();
    }, []);

    if (!track) {
        return (
            <Panel display={display} heading={heading}>
                {(isLoading || isSkeleton) && <TrackFeatureSkeleton />}
            </Panel>
        );
    } else {
        const data: ITrackFeatureSkeleton = {
            track: {
                id: track.items[0].id,
                album: track.items[0].album,
                artists: track.items[0].artists,
                color: track.items[0].color,
                image: track.items[0].image,
                name: track.items[0].name,
            },
            detailsRef: detailsRef,
            noWrapRef: noWrapRef,
            isOverflowed: isOverflowed,
        };

        return (
            <Panel display={display} heading={heading}>
                <TrackFeatureSkeleton data={data} />
            </Panel>
        );
    }
};

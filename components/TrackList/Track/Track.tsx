import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { ISmallListTrack } from '../../../lib/client/spotify-types';
import { SkeletonImage } from '../../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../../Skeletons/SkeletonText/SkeletonText';
import { IComponent, ITrackComponentBase } from '../../types';
import styles from './Track.module.scss';

interface ITrackSkeleton extends ITrackComponentBase {
    detailsRef: React.RefObject<HTMLDivElement>;
    noWrapRef: React.RefObject<HTMLDivElement>;
    overflow?: number;
}

type TrackSkeleton = IComponent<ITrackSkeleton>;

export const TrackSkeleton: FC<TrackSkeleton> = ({ data, state }) => (
    <div
        className={styles.track}
        style={{
            backgroundColor: data && data.track.color,
        }}
    >
        <div className={styles.content}>
            <div className={styles.cover}>
                {data ? (
                    <Image
                        src={data.track.image}
                        alt=""
                        height={36}
                        width={36}
                    />
                ) : (
                    <SkeletonImage height="36px" width="36px" state={state} />
                )}
            </div>
            <div className={styles.details} ref={data?.detailsRef}>
                <div
                    className={classNames(
                        styles.nowrap,
                        data?.overflow && data.overflow < 0 && styles.overflowed
                    )}
                    ref={data?.noWrapRef}
                    style={
                        data?.overflow && data.overflow < 0
                            ? {
                                  left: `${data.overflow}px`,
                                  transform: `translate(${
                                      data.overflow * -1
                                  }px, -50%)`,
                              }
                            : undefined
                    }
                >
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

// TODO: Get rid
export const Track: FC<{ track: ISmallListTrack }> = ({ track }) => {
    const detailsRef = useRef<HTMLDivElement>(null);
    const noWrapRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [overflow, setOverflow] = useState<number | undefined>(undefined);

    const measureOverflow = (): void => {
        const detailsWidth = detailsRef.current?.clientWidth;
        const noWrapWidth = noWrapRef.current?.clientWidth;
        if (detailsWidth && noWrapWidth)
            setOverflow(detailsWidth - noWrapWidth);
    };

    useEffect(() => {
        measureOverflow();
    }, [width]);

    const data: ITrackSkeleton = {
        track: {
            album: track.album,
            artists: track.artists,
            color: track.color,
            id: track.id,
            image: track.image,
            name: track.name,
        },
        detailsRef: detailsRef,
        noWrapRef: noWrapRef,
        overflow: overflow,
    };

    return <TrackSkeleton data={data} />;
};

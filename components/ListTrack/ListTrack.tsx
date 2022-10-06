import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { ITrack } from '../../lib/client/spotify-types';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import { IComponent } from '../types';
import styles from './ListTrack.module.scss';

type ListTrackSkeleton = IComponent<ITrack>;

export const ListTrack: FC<ListTrackSkeleton> = ({ data: track, state }) => {
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

    return (
        <div
            className={styles.track}
            style={{
                backgroundColor: track && track.color,
            }}
        >
            <div className={styles.content}>
                <div className={styles.cover}>
                    {track ? (
                        <Image
                            src={track.image}
                            alt=""
                            height={36}
                            width={36}
                        />
                    ) : (
                        <SkeletonImage
                            height="36px"
                            width="36px"
                            state={state}
                        />
                    )}
                </div>
                <div className={styles.details} ref={detailsRef}>
                    <div
                        className={classNames(
                            styles.nowrap,
                            overflow && overflow < 0 && styles.overflowed
                        )}
                        ref={noWrapRef}
                        style={
                            overflow && overflow < 0
                                ? {
                                      left: `${overflow}px`,
                                      transform: `translate(${-overflow}px, -50%)`,
                                  }
                                : undefined
                        }
                    >
                        {track ? (
                            <Link href={`/track/${track.id}`} passHref>
                                <a
                                    aria-label={`Explore ${track.name} by ${track.artists[0].name}`}
                                    className={styles.name}
                                >
                                    {track.name}
                                </a>
                            </Link>
                        ) : (
                            <a aria-hidden className={styles.name}>
                                <SkeletonText state={state} />
                            </a>
                        )}
                        <div className={styles.subdetails}>
                            {track ? (
                                <Link
                                    href={`/artist/${track.artists[0].id}`}
                                    passHref
                                >
                                    <a className={styles.subdetail}>
                                        {track.artists[0].name}
                                    </a>
                                </Link>
                            ) : (
                                <a className={styles.subdetail}>
                                    <SkeletonText state={state} />
                                </a>
                            )}
                            •
                            {track ? (
                                <Link
                                    href={`/album/${track.album.id}`}
                                    passHref
                                >
                                    <a className={styles.subdetail}>
                                        {track.album.name}
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
};

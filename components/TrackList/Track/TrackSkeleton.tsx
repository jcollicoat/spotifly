import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrack } from '../../../lib/interfaces/spotify';
import { IComponent } from '../../interfaces';
import { SkeletonImage } from '../../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../../Skeletons/SkeletonText/SkeletonText';
import styles from './Track.module.scss';

interface ITrackLoaded {
    track: Pick<ITrack, 'album' | 'artists' | 'id' | 'name'>;
    detailsRef: React.RefObject<HTMLDivElement>;
    noWrapRef: React.RefObject<HTMLDivElement>;
    albumColor?: string;
    isOverflowed?: boolean;
}

type TrackSkeleton = IComponent<ITrackLoaded>;

export const TrackSkeleton: FC<TrackSkeleton> = ({ data, state }) => (
    <div
        className={styles.track}
        style={{
            backgroundColor: data && data.albumColor,
        }}
    >
        <div
            className={classNames(
                styles.content,
                data && data.isOverflowed && styles.overflowed
            )}
        >
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
            <div className={styles.details} ref={data && data.detailsRef}>
                <div className={styles.nowrap} ref={data && data.noWrapRef}>
                    <a aria-hidden className={styles.name}>
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
                    </a>
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

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrack } from '../../lib/tracks/types';
import { Scroller } from '../Scroller/Scroller';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import { IComponent } from '../types';
import styles from './TrackFeature.module.scss';

type TrackFeatureSkeleton = IComponent<ITrack>;

export const TrackFeature: FC<TrackFeatureSkeleton> = ({
    data: track,
    state,
}) => (
    <div
        className={styles.track}
        style={{ backgroundColor: track && track.color }}
    >
        <div className={classNames(styles.content, track && styles.loaded)}>
            <div className={styles.cover}>
                {track ? (
                    <Image src={track.image} alt="" height={80} width={80} />
                ) : (
                    <SkeletonImage height="80px" width="80px" state={state} />
                )}
            </div>
            <Scroller>
                <div className={styles.details}>
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
                        {track && '•'}
                        {track ? (
                            <Link href={`/album/${track.album.id}`} passHref>
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
            </Scroller>
        </div>
    </div>
);

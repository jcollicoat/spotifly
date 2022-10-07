import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrack } from '../../lib/client/spotify-types';
import { Scroller } from '../Scroller/Scroller';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import { IComponent } from '../types';
import styles from './ListTrack.module.scss';

type ListTrackSkeleton = IComponent<ITrack>;

export const ListTrack: FC<ListTrackSkeleton> = ({ data: track, state }) => {
    console.log(track?.audio_features);

    return (
        <div
            className={styles.track}
            style={{
                backgroundColor: track && track.color,
            }}
        >
            <div className={classNames(styles.content, track && styles.loaded)}>
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
                </Scroller>
                {track?.audio_features && (
                    <div className={styles.audio_features}>
                        <span>
                            {Math.floor(
                                track.audio_features.danceability * 100
                            )}
                        </span>
                        <span>
                            {Math.floor(track.audio_features.energy * 100)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

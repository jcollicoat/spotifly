import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrack } from '../../lib/tracks/types';
import { Glyph } from '../Glyphs/Glyph';
import { Scroller } from '../Scroller/Scroller';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import { IComponent } from '../types';
import styles from './ListTrack.module.scss';

type ListTrackSkeleton = IComponent<ITrack>;

export const ListTrack: FC<ListTrackSkeleton> = ({ data: track, state }) => {
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
                        <div className={styles.feature}>
                            <Glyph
                                ariaLabel={`Mood: ${track.audio_features.valence}`}
                                type="Mood"
                                mood={
                                    // eslint-disable-next-line no-nested-ternary
                                    track.audio_features.valence > 25
                                        ? 'neutral'
                                        : track.audio_features.valence > 70
                                        ? 'happy'
                                        : 'sad'
                                }
                            />
                            <span aria-hidden className={styles.label}>
                                {`Mood: ${track.audio_features.valence}`}
                            </span>
                        </div>
                        <div className={styles.feature}>
                            <Glyph
                                ariaLabel={`Loudness: ${track.audio_features.loudness}`}
                                type="Loudness"
                            />
                            <span aria-hidden className={styles.label}>
                                {`Loudness: ${track.audio_features.loudness}`}
                            </span>
                        </div>
                        <div className={styles.feature}>
                            <Glyph
                                ariaLabel={`Acousticness: ${track.audio_features.acousticness}`}
                                type="Acousticness"
                            />
                            <span aria-hidden className={styles.label}>
                                {`Acousticness: ${track.audio_features.acousticness}`}
                            </span>
                        </div>
                        <div className={styles.feature}>
                            <Glyph
                                ariaLabel={`Danceability: ${track.audio_features.danceability}`}
                                type="Danceability"
                            />
                            <span aria-hidden className={styles.label}>
                                {`Danceability: ${track.audio_features.danceability}`}
                            </span>
                        </div>
                        <div className={styles.feature}>
                            <Glyph
                                ariaLabel={`Energy: ${track.audio_features.energy}`}
                                type="Energy"
                            />
                            <span aria-hidden className={styles.label}>
                                {`Energy: ${track.audio_features.energy}`}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

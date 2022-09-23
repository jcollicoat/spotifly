import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrackDTO } from '../../lib/interfaces/spotify';
import styles from './TopTrack.module.scss';

export const TopTrack: FC<{ track: ITrackDTO }> = ({ track }) => (
    <div
        className={styles.track}
        style={{
            backgroundImage: `url(${track.album.images[0].url})`,
        }}
    >
        <div className={styles.content}>
            <div className={styles.cover}>
                <Image
                    src={track.album.images[2].url}
                    alt=""
                    height={36}
                    width={36}
                />
            </div>
            <div className={styles.details}>
                <div className={styles.nowrap}>
                    <Link href={`/track/${track.id}`} passHref>
                        <a
                            aria-label={`Explore ${track.name} by ${track.artists[0].name}`}
                            className={styles.name}
                        >
                            {track.name}
                        </a>
                    </Link>
                    <div className={styles.subdetails}>
                        <Link href={`/artist/${track.artists[0].id}`} passHref>
                            <a className={styles.subdetail}>
                                {track.artists[0].name}
                            </a>
                        </Link>
                        •
                        <Link href={`/album/${track.album.id}`} passHref>
                            <a className={styles.subdetail}>
                                {track.album.name}
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

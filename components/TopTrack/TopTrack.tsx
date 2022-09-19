import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ITrackDTO } from '../../lib/interfaces/spotify';
import styles from './TopTrack.module.scss';

export const TopTrack: FC<{ track: ITrackDTO }> = ({ track }) => (
    <div className={styles.track}>
        <div className={styles.cover}>
            <Image
                src={track.album.images[2].url}
                alt=""
                height={36}
                width={36}
            />
        </div>
        <div className={styles.details}>
            <Link href={`/track/${track.id}`} passHref>
                <a
                    aria-label={`Explore ${track.name} by ${track.artists[0].name}`}
                    className={styles.name}
                >
                    {track.name}
                </a>
            </Link>
            <div className={styles.subdetails}>
                <span className={styles.artist}>{track.artists[0].name}</span>
                <span className={styles.album}>{track.album.name}</span>
            </div>
        </div>
    </div>
);

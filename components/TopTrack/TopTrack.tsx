import Image from 'next/image';
import { FC } from 'react';
import { ITrackDTO } from '../../lib/interfaces/spotify';
import styles from './TopTrack.module.scss';

export const TopTrack: FC<{ track: ITrackDTO }> = ({ track }) => (
    <div className={styles.track}>
        <div className={styles.cover}>
            <Image
                src={track.album.images[0].url}
                alt=""
                height={50}
                width={50}
            />
        </div>
        <div className={styles.details}>
            <div className={styles.name}>{track.name}</div>
            <div className={styles.subdetails}>
                <span className={styles.artist}>{track.artists[0].name}</span>
                <span className={styles.album}>{track.album.name}</span>
            </div>
        </div>
    </div>
);

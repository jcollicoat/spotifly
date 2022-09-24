import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { ITrackDTO } from '../../../lib/interfaces/spotify';
import styles from './Track.module.scss';

export const Track: FC<{ track: ITrackDTO }> = ({ track }) => {
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

    return (
        <div
            className={styles.track}
            style={{
                backgroundImage: `url(${track.album.images[0].url})`,
            }}
        >
            <div
                className={classNames(
                    styles.content,
                    isOverflowed && styles.overflowed
                )}
            >
                <div className={styles.cover}>
                    <Image
                        src={track.album.images[2].url}
                        alt=""
                        height={36}
                        width={36}
                    />
                </div>
                <div className={styles.details} ref={detailsRef}>
                    <div className={styles.nowrap} ref={noWrapRef}>
                        <Link href={`/track/${track.id}`} passHref>
                            <a
                                aria-label={`Explore ${track.name} by ${track.artists[0].name}`}
                                className={styles.name}
                            >
                                {track.name}
                            </a>
                        </Link>
                        <div className={styles.subdetails}>
                            <Link
                                href={`/artist/${track.artists[0].id}`}
                                passHref
                            >
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
};

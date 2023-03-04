import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { ISmallListArtist } from '../../../lib/_client/spotify-types';
import { SkeletonImage } from '../../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../../Skeletons/SkeletonText/SkeletonText';
import { IArtistComponentBase, IComponent } from '../../types';
import styles from './Artist.module.scss';

interface IArtistSkeleton extends IArtistComponentBase {
    detailsRef: React.RefObject<HTMLDivElement>;
    noWrapRef: React.RefObject<HTMLDivElement>;
    isOverflowed?: boolean;
}

type ArtistSkeleton = IComponent<IArtistSkeleton>;

export const ArtistSkeleton: FC<ArtistSkeleton> = ({ data, state }) => (
    <div
        className={styles.track}
        style={{
            backgroundColor: data && data.artist.color,
        }}
    >
        <div
            className={classNames(
                styles.content,
                data?.isOverflowed && styles.overflowed
            )}
        >
            <div className={styles.cover}>
                {data ? (
                    <Image
                        src={data.artist.image}
                        alt=""
                        height={36}
                        width={36}
                    />
                ) : (
                    <SkeletonImage height="36px" width="36px" state={state} />
                )}
            </div>
            <div className={styles.details} ref={data?.detailsRef}>
                <div className={styles.nowrap} ref={data?.noWrapRef}>
                    {data ? (
                        <Link
                            aria-label={`Explore ${data.artist.name}`}
                            className={styles.name}
                            href={`/artist/${data.artist.id}`}
                        >
                            {data.artist.name}
                        </Link>
                    ) : (
                        <a aria-hidden className={styles.name}>
                            <SkeletonText state={state} />
                        </a>
                    )}
                    <div className={styles.subdetails}>
                        {data ? (
                            <span className={styles.subdetail}>
                                {data.artist.genres[0]}
                            </span>
                        ) : (
                            <span className={styles.subdetail}>
                                <SkeletonText state={state} />
                            </span>
                        )}
                        •
                        {data ? (
                            <span className={styles.subdetail}>
                                {data.artist.followers} Followers
                            </span>
                        ) : (
                            <span className={styles.subdetail}>
                                <SkeletonText state={state} />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// TODO: Get rid
export const Artist: FC<{ artist: ISmallListArtist }> = ({ artist }) => {
    const detailsRef = useRef<HTMLDivElement>(null);
    const noWrapRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [isOverflowed, setIsOverflowed] = useState(false);

    const measureOverflow = (): void => {
        const detailsWidth = detailsRef.current?.clientWidth;
        const noWrapWidth = noWrapRef.current?.clientWidth;

        if (!detailsWidth || !noWrapWidth) {
            setIsOverflowed(false);
        } else {
            setIsOverflowed(detailsWidth < noWrapWidth);
        }
    };

    useEffect(() => {
        measureOverflow();
    }, [width]);

    const data: IArtistSkeleton = {
        artist: artist,
        detailsRef: detailsRef,
        noWrapRef: noWrapRef,
        isOverflowed: isOverflowed,
    };

    return <ArtistSkeleton data={data} />;
};

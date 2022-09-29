import { FC } from 'react';
import { ISkeleton } from '../../interfaces';
import { SkeletonImage } from '../../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../../Skeletons/SkeletonText/SkeletonText';
import styles from './TrackSkeleton.module.scss';

export const TrackSkeleton: FC<ISkeleton> = ({ state }) => (
    <div className={styles.track}>
        <div className={styles.content}>
            <div className={styles.cover}>
                <SkeletonImage height="36px" width="36px" state={state} />
            </div>
            <div className={styles.details}>
                <div className={styles.nowrap}>
                    <a aria-hidden className={styles.name}>
                        <SkeletonText state={state} />
                    </a>
                    <div className={styles.subdetails}>
                        <SkeletonText state={state} />
                        •
                        <SkeletonText state={state} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

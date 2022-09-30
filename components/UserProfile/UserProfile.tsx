import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { IUserProfile } from '../../lib/interfaces/spotify';
import { getUserProfile } from '../../lib/spotify';
import { IComponent, ICreatePanel } from '../interfaces';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import styles from './UserProfile.module.scss';

type UserProfileSkeleton = IComponent<IUserProfile>;

const UserProfileSkeleton: FC<UserProfileSkeleton> = ({ data, state }) => {
    const displayFollowers =
        data &&
        (data.followers === 1
            ? `${data.followers} Follower`
            : `${data.followers} Followers`);

    return (
        <div className={classNames(styles.wrapper, state && styles.skeleton)}>
            <h1 className={styles.dashboard}>
                {data ? 'Dashboard' : <SkeletonText text="Dashboard" />}
            </h1>
            <div className={styles.user}>
                <div className={styles.image}>
                    {data ? (
                        <Image
                            src={data.image}
                            alt={`Photo of ${data.display_name}`}
                            height={80}
                            width={80}
                        />
                    ) : (
                        <SkeletonImage
                            height="80px"
                            rounded={true}
                            width="80px"
                        />
                    )}
                </div>
                <div className={styles.details}>
                    <span className={styles.name}>
                        {data ? (
                            data.display_name
                        ) : (
                            <SkeletonText state={state} />
                        )}
                    </span>
                    <div className={styles.stats}>
                        <span className={styles.stat}>
                            {data ? (
                                data.country
                            ) : (
                                <SkeletonText state={state} />
                            )}
                        </span>
                        <span className={styles.stat}>
                            {data ? (
                                data.type.charAt(0).toUpperCase() +
                                data.type.slice(1)
                            ) : (
                                <SkeletonText state={state} />
                            )}
                        </span>
                        <span className={styles.stat}>
                            {data ? (
                                displayFollowers
                            ) : (
                                <SkeletonText state={state} />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UserProfile: FC<ICreatePanel> = ({ isSkeleton }) => {
    const {
        data: user,
        isError,
        isLoading,
    } = useQuery<IUserProfile>(['userProfile'], getUserProfile, {
        staleTime: Infinity,
    });

    const display: IPanelDisplay = {
        area: 'user',
    };

    return (
        <Panel display={display}>
            {(isLoading || isError || isSkeleton) && <UserProfileSkeleton />}
            {user && <UserProfileSkeleton data={user} />}
        </Panel>
    );
};

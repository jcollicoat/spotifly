import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FC } from 'react';
import { getUserProfile } from '../../lib/client/api';
import { UserProfile } from '../../lib/user/types';
import { IPanelDisplay, Panel } from '../Panels/_Bases/Panel/Panel';
import { IPanelHeading } from '../Panels/_Bases/PanelHeading/PanelHeading';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import { IComponent, ICreatePanel } from '../types';
import styles from './UserProfile.module.scss';

type UserProfileSkeleton = IComponent<UserProfile>;

const UserProfileSkeleton: FC<UserProfileSkeleton> = ({ data, state }) => {
    const displayFollowers =
        data &&
        (data.followers === 1
            ? `${data.followers} Follower`
            : `${data.followers} Followers`);

    return (
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
                    <SkeletonImage height="80px" rounded={true} width="80px" />
                )}
            </div>
            <div className={styles.details}>
                <span className={styles.name}>
                    {data ? data.display_name : <SkeletonText state={state} />}
                </span>
                <div className={styles.stats}>
                    <span className={styles.stat}>
                        {data ? data.country : <SkeletonText state={state} />}
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
                            data.product.charAt(0).toUpperCase() +
                            data.product.slice(1)
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
    );
};

export const UserProfile: FC<ICreatePanel> = ({ isSkeleton }) => {
    const {
        data: user,
        isError,
        isLoading,
    } = useQuery<UserProfile>(['userProfile'], getUserProfile, {
        staleTime: Infinity,
    });

    const display: IPanelDisplay = {
        area: 'user',
    };

    const heading: IPanelHeading = {
        subheading: 'Dashboard',
        subheadingLevel: 'h1',
    };

    return (
        <Panel display={display} heading={heading}>
            {(isLoading || isError || isSkeleton) && <UserProfileSkeleton />}
            {user && <UserProfileSkeleton data={user} />}
        </Panel>
    );
};

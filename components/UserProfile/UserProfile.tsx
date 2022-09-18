import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FC } from 'react';
import { IUserProfileDTO } from '../../lib/interfaces/spotify';
import { getUserProfile } from '../../lib/spotify';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { Spinner } from '../Spinner/Spinner';
import styles from './UserProfile.module.scss';

export const UserProfile: FC = () => {
    const {
        data: user,
        isError,
        isLoading,
    } = useQuery<IUserProfileDTO>(['userProfile'], getUserProfile, {
        staleTime: Infinity,
    });

    const display: IPanelDisplay = {
        area: 'user',
    };

    return (
        <Panel display={display}>
            {isLoading && <Spinner padding="small" />}
            {isError && <div>An error occured.</div>}
            {user && (
                <div className={styles.wrapper}>
                    <h1 className={styles.dashboard}>Dashboard</h1>
                    <div className={styles.user}>
                        <div className={styles.image}>
                            <Image
                                src={user.images[0].url}
                                alt={`Photo of ${user.display_name}`}
                                height={80}
                                width={80}
                            />
                        </div>
                        <div className={styles.details}>
                            <span className={styles.name}>
                                {user.display_name}
                            </span>
                            <div className={styles.stats}>
                                <span className={styles.stat}>
                                    {user.country}
                                </span>
                                <span className={styles.stat}>
                                    {user.product.charAt(0).toUpperCase() +
                                        user.product.slice(1)}
                                </span>
                                <span className={styles.stat}>
                                    {user.followers.total === 1
                                        ? `${user.followers.total} Follower`
                                        : `${user.followers.total} Followers`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Panel>
    );
};

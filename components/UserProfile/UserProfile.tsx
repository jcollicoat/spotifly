import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { IUserProfileDTO } from '../../lib/interfaces/spotify';
import { getUserProfile } from '../../lib/spotify';
import { IComponent } from '../interfaces';
import { IPanelDisplay, Panel } from '../Panels/Panel/Panel';
import { SkeletonImage } from '../Skeletons/SkeletonImage/SkeletonImage';
import { SkeletonText } from '../Skeletons/SkeletonText/SkeletonText';
import styles from './UserProfile.module.scss';

type Component = IComponent<IUserProfileDTO>;

const Component: FC<Component> = ({ state, data }) => {
    const displayFollowers =
        data &&
        (data.followers.total === 1
            ? `${data.followers.total} Follower`
            : `${data.followers.total} Followers`);

    return (
        <div className={classNames(styles.wrapper, state && styles.skeleton)}>
            <h1 className={styles.dashboard}>
                {state ? (
                    <SkeletonText
                        loading={state === 'loading'}
                        text="Dashboard"
                    />
                ) : (
                    'Dashboard'
                )}
            </h1>
            <div className={styles.user}>
                <div className={styles.image}>
                    {state ? (
                        <SkeletonImage
                            loading={state === 'loading'}
                            height="80px"
                            rounded={true}
                            width="80px"
                        />
                    ) : (
                        <Image
                            src={data.images[0].url}
                            alt={`Photo of ${data.display_name}`}
                            height={80}
                            width={80}
                        />
                    )}
                </div>
                <div className={styles.details}>
                    <span className={styles.name}>
                        {state ? (
                            <SkeletonText loading={state === 'loading'} />
                        ) : (
                            data.display_name
                        )}
                    </span>
                    <div className={styles.stats}>
                        <span className={styles.stat}>
                            {state ? (
                                <SkeletonText loading={state === 'loading'} />
                            ) : (
                                data.country
                            )}
                        </span>
                        <span className={styles.stat}>
                            {state ? (
                                <SkeletonText loading={state === 'loading'} />
                            ) : (
                                data.product.charAt(0).toUpperCase() +
                                data.product.slice(1)
                            )}
                        </span>
                        <span className={styles.stat}>
                            {state ? (
                                <SkeletonText loading={state === 'loading'} />
                            ) : (
                                displayFollowers
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
            {(isLoading || isError) && (
                <Component state={isLoading ? 'loading' : 'error'} />
            )}
            {user && <Component data={user} />}
        </Panel>
    );
};

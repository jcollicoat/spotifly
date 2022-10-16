import { ComponentStory } from '@storybook/react';
import { mockTrack } from '../../../mocks/mocks';

import { FeaturedTrack } from './FeaturedTrack';

export default {
    title: 'Tracks/Featured Track',
    component: FeaturedTrack,
    argTypes: {
        data: {
            table: {
                disable: true,
            },
        },
    },
};

const LoadedTemplate: ComponentStory<typeof FeaturedTrack> = (args) => {
    return <FeaturedTrack data={args.data} />;
};

export const Loaded = LoadedTemplate.bind({});
Loaded.argTypes = {
    state: { table: { disable: true } },
};
Loaded.args = {
    data: mockTrack,
};

const SkeletonTemplate: ComponentStory<typeof FeaturedTrack> = (args) => {
    return <FeaturedTrack state={args.state} />;
};

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {
    state: undefined,
};

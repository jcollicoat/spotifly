import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-next',
    ],
};

export default config;

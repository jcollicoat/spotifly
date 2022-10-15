import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon } from '../Icons/Icon';

import { Button } from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        glyph: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
};

const Template: ComponentStory<typeof Button> = (args) => {
    if (args.showGlyph !== undefined) {
        return <Button {...args} glyph={<Icon type="Dashboard" />} />;
    } else {
        return <Button {...args} />;
    }
};

export const Default = Template.bind({});
Default.args = {
    ariaLabel: 'Default Button',
    children: 'Default Button',
    style: 'primary',
};

export const Link = Template.bind({});
Link.args = {
    ariaLabel: 'Google link button',
    children: 'Google link button',
    href: 'https://www.google.com',
    style: 'primary',
    type: 'link',
};

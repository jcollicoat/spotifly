import { ComponentStory } from '@storybook/react';
import { Glyph, GlyphType } from '../Glyphs/Glyph';

import { Button } from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        glyph: {
            control: {
                type: 'select',
            },
            options: [
                'Dashboard',
                'Home',
                'Acousticness',
                'Danceability',
                'Energy',
            ],
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
    if (args.displayAsGlyph !== undefined) {
        return (
            <Button
                {...args}
                glyph={<Glyph type={args.glyph as GlyphType} />}
            />
        );
    } else {
        return <Button {...args} />;
    }
};

export const Default = Template.bind({});
Default.args = {
    ariaLabel: 'Default Button',
    children: 'Default Button',
    glyph: 'Dashboard',
    style: 'cta',
};
Default.argTypes = {
    href: {
        table: {
            disable: true,
        },
    },
};

export const Link = Template.bind({});
Link.args = {
    ariaLabel: 'Google link button',
    children: 'Google link button',
    glyph: 'Dashboard',
    href: 'https://www.google.com',
    style: 'primary',
    type: 'link',
};

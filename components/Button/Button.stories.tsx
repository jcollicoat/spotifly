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
    if (args.displayGlyph !== undefined) {
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
    displayGlyph: undefined,
    glyph: 'Dashboard',
    onClick: () => alert('Button clicked!'),
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
    displayGlyph: undefined,
    glyph: 'Dashboard',
    href: 'https://www.google.com',
    style: 'primary',
};

export const SignInOut = Template.bind({});
SignInOut.args = {
    ariaLabel: 'Sign in',
    children: 'Sign in',
    displayGlyph: 'postfix',
    glyph: 'SignInOut',
    onClick: () => alert('This is just Storybook.'),
    style: 'secondary',
};

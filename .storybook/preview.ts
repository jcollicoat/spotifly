import '../styles/global.scss';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    viewport: {
        viewports: {
            min: {
                name: 'Minimum',
                styles: {
                    height: '100%',
                    width: '320px',
                },
            },
            appOne: {
                name: 'App 1',
                styles: {
                    height: '100%',
                    width: '600px',
                },
            },
            appTwo: {
                name: 'App 2',
                styles: {
                    height: '100%',
                    width: '1200px',
                },
            },
            appThree: {
                name: 'App 3',
                styles: {
                    height: '100%',
                    width: '1800px',
                },
            },
        },
    },
};

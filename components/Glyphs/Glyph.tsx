import { FC, useMemo } from 'react';

const Bolt: FC = () => (
    <polygon
        points="8 0.5 8 5.5 11.5 5.5 6 13.5 6 8.5 2.5 8.5 8 0.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
    ></polygon>
);

const Dashboard: FC = () => (
    <g>
        <circle
            cx="7"
            cy="5.5"
            r="2.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></circle>
        <path
            d="M2.73,11.9a5,5,0,0,1,8.54,0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <circle
            cx="7"
            cy="7"
            r="6.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></circle>
    </g>
);

const Heartbeat: FC = () => (
    <g>
        <path
            d="M.58,4.31C1.09,1.85,4.12,0,7,3.27c4.11-4.71,8.5,1.13,5.52,4.14L7,12.5l-3.23-3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <polyline
            points="0.5 7 3 7 4.5 5 6.5 8.5 8 6.5 9.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></polyline>
    </g>
);

const Home: FC = () => (
    <g>
        <polyline
            points="0.5 7 7 0.5 13.5 7"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></polyline>
        <polyline
            points="2.5 8.5 2.5 13.5 11.5 13.5 11.5 8.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></polyline>
    </g>
);

interface IMood {
    mood?: 'happy' | 'neutral' | 'sad';
}

const Mood: FC<IMood> = ({ mood }) => {
    switch (mood) {
        case 'happy':
            return (
                <g fill="none">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.7 8C4.2 9.8 6.2 10.9 8 10.4C9.1 10 10 9.1 10.3 8"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.8 5.45C4.66193 5.45 4.55 5.33807 4.55 5.2C4.55 5.06193 4.66193 4.95 4.8 4.95"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.8 5.45C4.93807 5.45 5.05 5.33807 5.05 5.2C5.05 5.06193 4.93807 4.95 4.8 4.95"
                    ></path>
                    <g>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.2 5.45C9.06193 5.45 8.95 5.33807 8.95 5.2C8.95 5.06193 9.06193 4.95 9.2 4.95"
                        ></path>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.2 5.45C9.33807 5.45 9.45 5.33807 9.45 5.2C9.45 5.06193 9.33807 4.95 9.2 4.95"
                        ></path>
                    </g>
                </g>
            );
        case 'neutral':
            return (
                <g fill="none">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.5 9.5H10.5"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.8 5.45C4.66193 5.45 4.55 5.33807 4.55 5.2C4.55 5.06193 4.66193 4.95 4.8 4.95"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.8 5.45C4.93807 5.45 5.05 5.33807 5.05 5.2C5.05 5.06193 4.93807 4.95 4.8 4.95"
                    ></path>
                    <g>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.2 5.45C9.06193 5.45 8.95 5.33807 8.95 5.2C8.95 5.06193 9.06193 4.95 9.2 4.95"
                        ></path>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.2 5.45C9.33807 5.45 9.45 5.33807 9.45 5.2C9.45 5.06193 9.33807 4.95 9.2 4.95"
                        ></path>
                    </g>
                </g>
            );
        case 'sad':
            return (
                <g fill="none">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.7 10.5C4.2 8.7 6.1 7.6 8 8.1C9.1 8.4 10 9.3 10.4 10.5"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.85 5.45C4.71193 5.45 4.6 5.33807 4.6 5.2C4.6 5.06193 4.71193 4.95 4.85 4.95"
                    ></path>
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.85 5.45C4.98807 5.45 5.1 5.33807 5.1 5.2C5.1 5.06193 4.98807 4.95 4.85 4.95"
                    ></path>
                    <g>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.24999 5.45C9.11192 5.45 8.99999 5.33807 8.99999 5.2C8.99999 5.06193 9.11192 4.95 9.24999 4.95"
                        ></path>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.24999 5.45C9.38806 5.45 9.49999 5.33807 9.49999 5.2C9.49999 5.06193 9.38806 4.95 9.24999 4.95"
                        ></path>
                    </g>
                </g>
            );
        default:
            return null;
    }
};

const MusicNote: FC = () => (
    <g>
        <circle
            cx="4.25"
            cy="11"
            r="2.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></circle>
        <path
            d="M6.75,11V.5h0A5.5,5.5,0,0,1,12.25,6h0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </g>
);

interface ISignInOut {
    signout?: boolean;
}

const SignInOut: FC<ISignInOut> = ({ signout }) => {
    console.log(signout);
    return signout ? (
        <g>
            <line
                x1="6.5"
                y1="7"
                x2="13.5"
                y2="7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></line>
            <polyline
                points="11.5 5 13.5 7 11.5 9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></polyline>
            <path
                d="M11.7,11.49a6.5,6.5,0,1,1,0-9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </g>
    ) : (
        <g>
            <line
                x1="13.5"
                y1="7"
                x2="5.5"
                y2="7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></line>
            <polyline
                points="7.5 5 5.5 7 7.5 9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></polyline>
            <path
                d="M12.48,10.5a6.5,6.5,0,1,1,0-7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </g>
    );
};

const VolumeLoud: FC = () => (
    <g>
        <path
            d="M3,5H1.5a1,1,0,0,0-1,1V8a1,1,0,0,0,1,1H3Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M3,9l3.91,2.81a1,1,0,0,0,1,.08A1,1,0,0,0,8.5,11V3A1,1,0,0,0,8,2.11a1,1,0,0,0-1,.08L3,5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M12.5,4a4.38,4.38,0,0,1,1,3,6.92,6.92,0,0,1-1,3.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M10.5,5.5A2.19,2.19,0,0,1,11,7a2.19,2.19,0,0,1-.5,1.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </g>
);

const Warning: FC = () => (
    <g>
        <line
            x1="7"
            y1="5"
            x2="7"
            y2="8"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></line>
        <circle
            cx="7"
            cy="11"
            r="0.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></circle>
        <path
            d="M7.89,1.05a1,1,0,0,0-1.78,0l-5.5,11A1,1,0,0,0,1.5,13.5h11a1,1,0,0,0,.89-1.45Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </g>
);

export type GlyphType =
    | 'Acousticness'
    | 'Danceability'
    | 'Dashboard'
    | 'Energy'
    | 'Home'
    | 'Loudness'
    | 'Mood'
    | 'SignInOut'
    | 'Warning';

type GlyphProps = IMood & ISignInOut;

interface IGlyph extends GlyphProps {
    type: GlyphType;
    ariaLabel?: string;
    size?: 'large';
}

export const Glyph: FC<IGlyph> = ({ ariaLabel, type, size, mood, signout }) => {
    const glyph = useMemo(() => {
        switch (type) {
            case 'Acousticness':
                return <MusicNote />;
            case 'Danceability':
                return <Bolt />;
            case 'Dashboard':
                return <Dashboard />;
            case 'Energy':
                return <Heartbeat />;
            case 'Home':
                return <Home />;
            case 'Loudness':
                return <VolumeLoud />;
            case 'Mood':
                return <Mood mood={mood} />;
            case 'SignInOut':
                return <SignInOut signout={signout} />;
            case 'Warning':
                return <Warning />;
        }
    }, [type, mood, signout]);

    const iconSize = useMemo(() => {
        return size === 'large' ? '42' : '14';
    }, [size]);

    return (
        <svg
            aria-hidden={!ariaLabel}
            aria-label={ariaLabel}
            height={iconSize}
            stroke="currentColor"
            strokeWidth="1.25"
            viewBox="-0.25 -0.25 14.5 14.5"
            width={iconSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            {glyph}
        </svg>
    );
};

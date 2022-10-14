import { FC, useMemo } from 'react';

const Acousticness: FC = () => (
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

const Danceability: FC = () => (
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

const Energy: FC = () => (
    <polygon
        points="8 0.5 8 5.5 11.5 5.5 6 13.5 6 8.5 2.5 8.5 8 0.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
    ></polygon>
);

const Happy: FC = () => (
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

const Loudness: FC = () => (
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

type IconType =
    | 'acousticness'
    | 'danceability'
    | 'energy'
    | 'happy'
    | 'loudness';

interface IIcon {
    ariaLabel: string;
    type: IconType;
}

export const Icon: FC<IIcon> = ({ ariaLabel, type }) => {
    const icon = useMemo(() => {
        switch (type) {
            case 'acousticness':
                return <Acousticness />;
            case 'danceability':
                return <Danceability />;
            case 'energy':
                return <Energy />;
            case 'happy':
                return <Happy />;
            case 'loudness':
                return <Loudness />;
        }
    }, [type]);

    return (
        <svg
            aria-label={ariaLabel}
            height="16"
            strokeWidth="1.25"
            viewBox="0 0 14 14"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {icon}
        </svg>
    );
};

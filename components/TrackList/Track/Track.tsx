import { useColor } from 'color-thief-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { ITrack } from '../../../lib/interfaces/spotify';
import { TrackSkeleton } from './TrackSkeleton';

export const Track: FC<{ track: ITrack }> = ({ track }) => {
    const detailsRef = useRef<HTMLDivElement>(null);
    const noWrapRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [isOverflowed, setIsOverflowed] = useState(false);

    const measureOverflow = (): void => {
        const detailsWidth = detailsRef.current?.clientWidth;
        const noWrapWidth = noWrapRef.current?.clientWidth;

        if (!detailsWidth || !noWrapWidth) {
            setIsOverflowed(false);
        } else if (detailsWidth > noWrapWidth) {
            setIsOverflowed(false);
        } else if (detailsWidth < noWrapWidth) {
            setIsOverflowed(true);
        }
    };

    useEffect(() => {
        measureOverflow();
    }, [width]);

    const { data: albumColor } = useColor(track.album.image, 'hex', {
        crossOrigin: 'true',
    });

    const data = {
        track: {
            album: track.album,
            artists: track.artists,
            id: track.id,
            name: track.name,
        },
        detailsRef: detailsRef,
        noWrapRef: noWrapRef,
        albumColor: albumColor,
        isOverflowed: isOverflowed,
    };

    return <TrackSkeleton data={data} />;
};

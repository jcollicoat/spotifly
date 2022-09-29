import { useColor } from 'color-thief-react';
import { FC } from 'react';
import { ITrack } from '../../../lib/interfaces/spotify';
import { TrackSkeleton } from './TrackSkeleton';

export const Track: FC<{ track: ITrack }> = ({ track }) => {
    const { data: albumColor } = useColor(track.album.image, 'hex', {
        crossOrigin: 'true',
    });

    const data = {
        albumColor: albumColor,
        track: {
            album: track.album,
            artists: track.artists,
            id: track.id,
            name: track.name,
        },
    };

    return <TrackSkeleton data={data} />;
};

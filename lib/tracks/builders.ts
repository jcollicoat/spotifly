import { ITrackAPI, buildTrack } from '../../pages/api/spotify/getTrack';
import { ImageSize } from '../_helpers/types';
import { IAddonsTracksDTO } from '../addons/types';
import { ITrack } from './types';

export const buildTracks = async (
    trackAPIs: ITrackAPI[],
    addons?: IAddonsTracksDTO,
    imageSize?: ImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackAPIs.map(
            async (track) => await buildTrack(track, addons, imageSize)
        )
    );
};

/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { getAverageColor } from 'fast-average-color-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
    ITrackDTO,
    AlbumImageSize,
    ITrack,
    IAlbumDTO,
    IAlbumReduced,
} from '../../../lib/spotify-types';
import { reduceItemArtists, appendUUID } from '../api-helpers';

const endpoint = 'https://api.spotify.com/v1/tracks/';

export const reduceAlbum = async (
    album: IAlbumDTO,
    imageSize?: AlbumImageSize
): Promise<IAlbumReduced> => {
    const color = await getAverageColor(album.images[2].url);
    return {
        id: album.id,
        color: color.hex,
        image: album.images[imageSize ?? 2].url,
        key: appendUUID(album.id),
        name: album.name,
        release_date: album.release_date,
    };
};

const buildTrack = async (
    data: ITrackDTO,
    imageSize?: AlbumImageSize
): Promise<ITrack> => ({
    id: data.id,
    album: await reduceAlbum(data.album, imageSize),
    artists: reduceItemArtists(data.artists),
    key: appendUUID(data.id),
    name: data.name,
    popularity: data.popularity,
    type: data.type,
});

export const buildTracks = async (
    trackDTOs: ITrackDTO[],
    imageSize?: AlbumImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackDTOs.map(async (track) => await buildTrack(track, imageSize))
    );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const trackId = req.query.trackId;

    if (typeof trackId !== 'string') {
        res.status(400).send(`Bad trackID supplied: ${trackId}`);
    } else if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint + trackId, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = await buildTrack(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

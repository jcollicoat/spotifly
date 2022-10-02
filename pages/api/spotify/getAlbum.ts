/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
// import { getAverageColor } from 'fast-average-color-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
    AlbumImageSize,
    IAlbum,
    IAlbumDTO,
} from '../../../lib/client/spotify-types';
import { appendUUID, reduceItemArtists } from '../../../lib/server/helpers';

const endpoint = 'https://api.spotify.com/v1/albums/';

const buildAlbum = async (
    album: IAlbumDTO,
    imageSize?: AlbumImageSize
): Promise<IAlbum> => {
    // const color = await getAverageColor(album.images[2].url);
    await setTimeout(() => null, 200);
    return {
        album_type: album.album_type,
        artists: reduceItemArtists(album.artists),
        color: 'red',
        id: album.id,
        image: album.images[imageSize ?? 2].url,
        key: appendUUID(album.id),
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        type: album.type,
    };
};

export const buildAlbums = async (
    albumDTOs: IAlbumDTO[],
    imageSize?: AlbumImageSize
): Promise<IAlbum[]> => {
    return await Promise.all(
        albumDTOs.map(async (track) => await buildAlbum(track, imageSize))
    );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const albumId = req.query.albumId;

    if (typeof albumId !== 'string') {
        res.status(400).send(`Bad albumID supplied: ${albumId}`);
    } else if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint + albumId, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = buildAlbum(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

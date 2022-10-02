/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { reduceItemArtists, appendUUID } from '../../../lib/helpers';
import { IAlbumDTO, IAlbum } from '../../../lib/types/spotify';

const endpoint = 'https://api.spotify.com/v1/albums';

const buildAlbums = (data: IAlbumDTO[]): IAlbum[] =>
    data.map((item) => ({
        album_type: item.album_type,
        artists: reduceItemArtists(item.artists),
        id: item.id,
        images: item.images,
        key: appendUUID(item.id),
        name: item.name,
        release_date: item.release_date,
        total_tracks: item.total_tracks,
        type: item.type,
    }));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;
        const albumIds = req.query.albumIds?.toString();

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params: {
                ids: albumIds,
            },
        });
        const built = buildAlbums(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

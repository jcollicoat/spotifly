/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { IArtist } from '../../../lib/client/spotify-types';
import { appendUUID } from '../../../lib/server/helpers';
import { IArtistDTO } from '../../../lib/server/spotify-types';

const endpoint = 'https://api.spotify.com/v1/artists/';

const buildArtist = (data: IArtistDTO): IArtist => ({
    followers: data.followers.total,
    genres: data.genres,
    id: data.id,
    images: data.images,
    key: appendUUID(data.id),
    name: data.name,
    popularity: data.popularity,
    type: data.type,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const artistId = req.query.artistId;

    if (typeof artistId !== 'string') {
        res.status(400).send(`Bad artistID supplied: ${artistId}`);
    } else if (!session) {
        res.status(401).send(
            'No session data found. User is likely not logged in.'
        );
    } else {
        const access_token = session.access_token;

        const response = await axios.get(endpoint + artistId, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const built = buildArtist(response.data);

        res.status(response.status).json(built);
    }
};

export default handler;

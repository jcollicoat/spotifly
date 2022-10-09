/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { getAverageColor } from 'fast-average-color-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageSize } from '../../../lib/client/types/_simple';
import { IArtist } from '../../../lib/client/types/artists';
import { determineAccessToken } from '../../../lib/server/auth';
import { appendUUID, handleError } from '../../../lib/server/helpers';
import { IImageDTO } from '../../../lib/server/types/_simple';

const endpoint = 'https://api.spotify.com/v1/artists/';

export interface IArtistAPI {
    id: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    images: IImageDTO[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export const buildArtist = async (
    artistAPI: IArtistAPI,
    imageSize?: ImageSize
): Promise<IArtist> => {
    const color = await getAverageColor(artistAPI.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${artistAPI.id} (${artistAPI.name}).`
        );
    }

    return {
        id: artistAPI.id,
        color: color.hex,
        followers: artistAPI.followers.total,
        genres: artistAPI.genres,
        image: artistAPI.images[imageSize ?? 2].url,
        key: appendUUID(artistAPI.id),
        name: artistAPI.name,
        popularity: artistAPI.popularity,
        type: artistAPI.type,
    };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const artistID = req.query.artistID;
        const artistAPI = await axios.get<IArtistAPI>(endpoint + artistID, {
            headers: {
                Authorization: access_token,
            },
        });

        const builtArtist = await buildArtist(artistAPI.data);

        res.status(200).json(builtArtist);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

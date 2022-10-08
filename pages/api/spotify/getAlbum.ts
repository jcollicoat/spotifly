/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AlbumImageSize } from '../../../lib/client/types/_simple';
import { IAlbum } from '../../../lib/client/types/albums';
import { determineAccessToken } from '../../../lib/server/auth';
import {
    appendUUID,
    handleError,
    reduceItemArtists,
} from '../../../lib/server/helpers';
import { IImageDTO } from '../../../lib/server/types/_simple';
import { IArtistDTO } from '../../../lib/server/types/artists';
import { ITrackDTO } from '../../../lib/server/types/tracks';

const endpoint = 'https://api.spotify.com/v1/albums/';

export interface IAlbumAPI {
    album_type: string;
    artists: IArtistDTO[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: IImageDTO[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
        reason: string;
    };
    total_tracks: number;
    tracks: {
        href: string;
        items: ITrackDTO[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    type: string;
    uri: string;
}

export const buildAlbum = async (
    album: IAlbumAPI,
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const albumID = req.query.albumID;
        const albumAPI = await axios.get<IAlbumAPI>(endpoint + albumID, {
            headers: {
                Authorization: access_token,
            },
        });

        const builtAlbum = await buildAlbum(albumAPI.data);

        res.status(200).json(builtAlbum);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

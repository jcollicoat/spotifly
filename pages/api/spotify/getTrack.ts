/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { getAverageColor } from 'fast-average-color-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { appendUUID, handleError } from '../../../lib/_helpers/server';
import { determineAccessToken } from '../../../lib/auth/server';
import { ImageSize } from '../../../lib/client/types/_simple';
import { ITrack } from '../../../lib/client/types/tracks';
import {
    reduceAlbum,
    reduceArtists,
    reduceAudioFeatures,
} from '../../../lib/server/spotify';
import { ITrackArtistDTO } from '../../../lib/server/types/_simple';
import { IAddonsTracksDTO } from '../../../lib/server/types/addons';
import { IAlbumAPI } from './getAlbum';

const endpoint = 'https://api.spotify.com/v1/tracks/';

export interface ITrackAPI {
    id: string;
    album: IAlbumAPI;
    artists: ITrackArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        ean: string;
        isrc: string;
        upc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export const buildTrack = async (
    trackAPI: ITrackAPI,
    addons?: IAddonsTracksDTO,
    imageSize?: ImageSize
): Promise<ITrack> => {
    const color = await getAverageColor(trackAPI.album.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${trackAPI.id} (${trackAPI.name}).`
        );
    }

    if (addons) {
        const audio_features = addons.audio_features?.audio_features.find(
            (featureSet) => featureSet.id === trackAPI.id
        );

        const track: ITrack = {
            id: trackAPI.id,
            album: reduceAlbum(trackAPI.album),
            artists: reduceArtists(trackAPI.artists),
            audio_features:
                audio_features && reduceAudioFeatures(audio_features),
            color: color.hex,
            image: trackAPI.album.images[imageSize ?? 2].url,
            key: appendUUID(trackAPI.id),
            name: trackAPI.name,
            popularity: trackAPI.popularity,
            type: trackAPI.type,
        };
        return track;
    }

    const track: ITrack = {
        id: trackAPI.id,
        album: reduceAlbum(trackAPI.album),
        artists: reduceArtists(trackAPI.artists),
        color: color.hex,
        image: trackAPI.album.images[imageSize ?? 2].url,
        key: appendUUID(trackAPI.id),
        name: trackAPI.name,
        popularity: trackAPI.popularity,
        type: trackAPI.type,
    };
    return track;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const access_token = await determineAccessToken(req);

        const trackID = req.query.trackID;
        const trackAPI = await axios.get<ITrackAPI>(endpoint + trackID, {
            headers: {
                Authorization: access_token,
            },
        });

        const builtAlbum = await buildTrack(trackAPI.data);

        res.status(200).json(builtAlbum);
    } catch (error) {
        const { status, message } = handleError(error);
        res.status(status).send(message);
    }
};

export default handler;

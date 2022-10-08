import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IArtistMinimum } from '../client/spotify-types';
import { IItemArtistDTO } from './spotify-types';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

type ErrorResponse = {
    status: number;
    message: string;
};

export const handleError = (error: unknown): ErrorResponse => {
    if (error instanceof AxiosError)
        return {
            status: error.response?.status ?? 400,
            message: `Error fetching Spotify API endpoint ${
                error.request.path ?? '[apiPathNotFound]'
            } | ${
                error.response?.data.error.message ?? '[errorMessageNotFound]'
            }.`,
        };
    if (error instanceof Error)
        return {
            status: 400,
            message: error.message,
        };
    return {
        status: 500,
        message: `Unhandled error occured: ${error}`,
    };
};

export const reduceItemArtists = (
    artists: IItemArtistDTO[]
): IArtistMinimum[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

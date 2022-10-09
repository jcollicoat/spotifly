import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IAudioFeaturesAPI } from '../addons/types';

export const appendUUID = (input: string): string => `${input}-${uuidv4()}`;

export const getFloats = (audioFeaturesAPI: IAudioFeaturesAPI) => {
    const asArray = Object.entries(audioFeaturesAPI);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filtered = asArray.filter(([key, value]) => value >= 0 && value <= 1);
    return Object.fromEntries(filtered);
};

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

import { AxiosError } from 'axios';

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

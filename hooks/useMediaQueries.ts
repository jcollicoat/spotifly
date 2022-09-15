import { IBreakpoints, useBreakpoint } from '../context/breakpoints/context';

interface IMediaQuery<T> {
    matches: (breakpoints: IBreakpoints) => boolean;
    value: T;
}

export const useMediaQueries = <T>(
    queries: IMediaQuery<T>[],
    defaultValue: T
): T => {
    const breakpointContext = useBreakpoint();

    const matchingQuery = queries.find((query) =>
        query.matches(breakpointContext)
    );

    return matchingQuery?.value ?? defaultValue;
};

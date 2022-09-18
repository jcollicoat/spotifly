import React, { createContext, FC, useContext, useMemo } from 'react';
import { useMedia } from 'react-use';
import { breakpoints } from './breakpoints';

export interface IBreakpoints {
    medium: boolean;
    large: boolean;
}

const BreakpointContext = createContext<IBreakpoints | undefined>(undefined);

const BreakpointProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const medium = useMedia(`(min-width: ${breakpoints.medium}px)`, false);
    const large = useMedia(`(min-width: ${breakpoints.large}px)`, false);

    const value = useMemo(() => ({ medium, large }), [medium, large]);

    return (
        <BreakpointContext.Provider value={value}>
            {children}
        </BreakpointContext.Provider>
    );
};

const useBreakpoint = () => {
    const context = useContext(BreakpointContext);

    if (!context) {
        throw new Error(
            'useBreakpoint must be used within a BreakpointProvider'
        );
    }
    return context;
};

export { useBreakpoint, BreakpointProvider };

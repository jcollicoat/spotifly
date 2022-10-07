import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import styles from './Scroller.module.scss';

interface IScroller {
    children: React.ReactNode;
}

export const Scroller: FC<IScroller> = ({ children }) => {
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [overflow, setOverflow] = useState<number | undefined>(undefined);

    const measureOverflow = (): void => {
        const detailsWidth = maskRef.current?.clientWidth;
        const noWrapWidth = contentRef.current?.clientWidth;
        if (detailsWidth && noWrapWidth)
            setOverflow(detailsWidth - noWrapWidth);
    };

    useEffect(() => {
        measureOverflow();
    }, [width]);

    return (
        <div
            className={classNames(
                styles.mask,
                overflow && overflow < 0 && styles.overflowed
            )}
            ref={maskRef}
        >
            <div
                className={classNames(
                    styles.content,
                    overflow && overflow < 0 && styles.overflowed
                )}
                ref={contentRef}
                style={
                    overflow && overflow < 0
                        ? {
                              left: `${overflow}px`,
                              transform: `translate(${-overflow}px, -50%)`,
                          }
                        : undefined
                }
            >
                {children}
            </div>
        </div>
    );
};

import { FC } from 'react';
import { useTopArtists } from '../../hooks/useSpotify';
import { appendUUID } from '../../lib/_helpers/helpers';
import { IArtist } from '../../lib/artists/types';
import { IPanelDisplay, Panel } from '../Panels/_Bases/Panel/Panel';
import {
    HeadingLevel,
    IPanelHeading,
} from '../Panels/_Bases/PanelHeading/PanelHeading';
import { ICreatePanel, SkeletonStates } from '../types';
import { Artist, ArtistSkeleton } from './Artist/Artist';

type ComponentTypes = 'top-artists';

interface IArtistListPanel extends ICreatePanel {
    list: ComponentTypes;
    subheading: string;
    subheadingLevel?: HeadingLevel;
    title?: string;
}

export const ArtistList: FC<IArtistListPanel> = ({
    list,
    subheading,
    subheadingLevel,
    title,
    isSkeleton,
}) => {
    const mapQueryType = () => {
        switch (list) {
            case 'top-artists':
                return useTopArtists;
        }
    };
    const query = mapQueryType();
    const { data, isError, isLoading } = query();

    // TODO: Fix this ugly ass code
    const mapArtists = (artists?: IArtist[] | SkeletonStates) => {
        if (!artists || isSkeleton) {
            return new Array(20)
                .fill('')
                .map(() => <ArtistSkeleton key={appendUUID('')} />);
        } else if (artists === 'warning' || artists === 'error') {
            return new Array(20)
                .fill('')
                .map(() => (
                    <ArtistSkeleton key={appendUUID('')} state={artists} />
                ));
        } else {
            return artists.map((artist) => (
                <Artist key={artist.key} artist={artist} />
            ));
        }
    };

    const heading: IPanelHeading = {
        subheading: subheading,
        subheadingLevel: subheadingLevel,
        title: title,
        titleLarge: true,
    };

    const display: IPanelDisplay = {
        area: list,
        minHeight: isLoading ? 1475 : undefined,
    };

    return (
        <Panel display={display} heading={heading}>
            {isLoading && mapArtists()}
            {isError && mapArtists('error')}
            {data && mapArtists(data.artists)}
        </Panel>
    );
};

import { FC } from 'react';
import { useTopArtists } from '../../hooks/useSpotify';
import { ISmallListArtist } from '../../lib/client/spotify-types';
import { appendUUID } from '../../lib/server/helpers';
import { IPanelDisplay, Panel } from '../Panels/_Bases/Panel/Panel';
import { IPanelHeading } from '../Panels/_Bases/PanelHeading/PanelHeading';
import { ICreatePanel, SkeletonStates } from '../types';
import { Artist, ArtistSkeleton } from './Artist/Artist';

type ComponentTypes = 'top-artists';

interface IArtistListPanel extends ICreatePanel {
    list: ComponentTypes;
    subheading: string;
    title?: string;
}

export const ArtistList: FC<IArtistListPanel> = ({
    list,
    subheading,
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
    const mapArtists = (artists?: ISmallListArtist[] | SkeletonStates) => {
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

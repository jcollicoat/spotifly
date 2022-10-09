import { IArtistAPI } from '../../pages/api/spotify/getArtist';
import { IAlbumAPI } from '../albums/types';
import { appendUUID } from '../server/helpers';
import { ITrackArtistDTO } from '../tracks/types';
import { IAlbumMinimum, IArtistMinimum } from './types';

export const reduceAlbum = (album: IAlbumAPI): IAlbumMinimum => {
    return {
        id: album.id,
        key: appendUUID(album.id),
        name: album.name,
    };
};

export const reduceArtists = (
    artists: IArtistAPI[] | ITrackArtistDTO[]
): IArtistMinimum[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

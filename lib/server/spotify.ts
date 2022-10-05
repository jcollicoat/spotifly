import { getAverageColor } from 'fast-average-color-node';
import {
    AlbumImageSize,
    IAlbum,
    IAlbumMinimum,
    // IArtist,
    IRecentlyPlayed,
    ISmallListArtist,
    ISmallListTrack,
    ITopArtists,
    ITopTracks,
    IUserProfile,
} from '../client/spotify-types';
import { reduceItemArtists, appendUUID } from './helpers';
import {
    IAlbumDTO,
    IAlbumsDTO,
    IArtistDTO,
    IRecentlyPlayedDTO,
    ITopArtistsDTO,
    ITopTracksDTO,
    ITrackDTO,
    IUserProfileDTO,
} from './spotify-types';

export const reduceAlbum = (album: IAlbumDTO): IAlbumMinimum => {
    return {
        id: album.id,
        key: appendUUID(album.id),
        name: album.name,
    };
};

export const buildAlbum = async (
    album: IAlbumDTO,
    imageSize?: AlbumImageSize
): Promise<IAlbum> => {
    // const color = await getAverageColor(album.images[2].url);
    await setTimeout(() => null, 200);
    return {
        album_type: album.album_type,
        artists: reduceItemArtists(album.artists),
        color: 'red',
        id: album.id,
        image: album.images[imageSize ?? 2].url,
        key: appendUUID(album.id),
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        type: album.type,
    };
};

export const buildAlbums = async (
    albumsDTO: IAlbumsDTO,
    imageSize?: AlbumImageSize
): Promise<IAlbum[]> => {
    return await Promise.all(
        albumsDTO.albums.map(
            async (track) => await buildAlbum(track, imageSize)
        )
    );
};

// export const buildArtist = (data: IArtistDTO): IArtist => ({
//     followers: data.followers.total,
//     genres: data.genres,
//     id: data.id,
//     images: data.images,
//     key: appendUUID(data.id),
//     name: data.name,
//     popularity: data.popularity,
//     type: data.type,
// });

export const buildTrack = async (
    data: ITrackDTO,
    imageSize?: AlbumImageSize,
    type?: 'list-small'
): Promise<ISmallListTrack> => {
    const color = await getAverageColor(data.album.images[2].url);
    if (type === 'list-small') {
        const track: ISmallListTrack = {
            id: data.id,
            album: reduceAlbum(data.album),
            artists: reduceItemArtists(data.artists),
            color: color.hex,
            image: data.album.images[imageSize ?? 2].url,
            key: appendUUID(data.id),
            name: data.name,
            popularity: data.popularity,
            type: data.type,
        };
        return track;
    }
    const track: ISmallListTrack = {
        id: data.id,
        album: reduceAlbum(data.album),
        artists: reduceItemArtists(data.artists),
        color: color.hex,
        image: data.album.images[imageSize ?? 2].url,
        key: appendUUID(data.id),
        name: data.name,
        popularity: data.popularity,
        type: data.type,
    };
    return track;
};

export const buildTracks = async (
    trackDTOs: ITrackDTO[],
    imageSize?: AlbumImageSize,
    type?: 'list-small'
): Promise<ISmallListTrack[]> => {
    return await Promise.all(
        trackDTOs.map(async (track) => await buildTrack(track, imageSize, type))
    );
};

export const buildRecentlyPlayed = async (
    data: IRecentlyPlayedDTO
): Promise<IRecentlyPlayed<ISmallListTrack>> => {
    const items: ISmallListTrack[] = await buildTracks(
        data.items.map((item) => item.track),
        AlbumImageSize.small,
        'list-small'
    );
    return {
        items: items,
        limit: data.limit,
        next: data.next,
        cursors: {
            after: data.cursors.after,
        },
        total: data.total,
    };
};

const buildArtist = async (
    artist: IArtistDTO,
    imageSize?: AlbumImageSize
): Promise<ISmallListArtist> => {
    const color = await getAverageColor(artist.images[2].url);
    return {
        id: artist.id,
        color: color.hex,
        followers: artist.followers.total,
        genres: artist.genres,
        image: artist.images[imageSize ?? 2].url,
        key: appendUUID(artist.id),
        name: artist.name,
        popularity: artist.popularity,
    };
};

const buildArtists = async (
    artists: IArtistDTO[],
    imageSize?: AlbumImageSize
): Promise<ISmallListArtist[]> => {
    return await Promise.all(
        artists.map(async (artist) => await buildArtist(artist, imageSize))
    );
};

export const buildTopArtists = async (
    data: ITopArtistsDTO
): Promise<ITopArtists<ISmallListArtist>> => ({
    artists: await buildArtists(data.items),
    next: data.next,
    offset: data.offset,
    previous: data.previous,
    total: data.total,
});

export const buildTopTracks = async (
    data: ITopTracksDTO
): Promise<ITopTracks<ISmallListTrack>> => ({
    items: await buildTracks(data.items, AlbumImageSize.small, 'list-small'),
    next: data.next,
    offset: data.offset,
    previous: data.previous,
    total: data.total,
});

export const buildUserProfile = (data: IUserProfileDTO): IUserProfile => ({
    country: data.country,
    display_name: data.display_name,
    followers: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    product: data.product,
    type: data.type,
});

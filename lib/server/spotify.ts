import { getAverageColor } from 'fast-average-color-node';
import {
    AlbumImageSize,
    IAlbum,
    IAlbumReduced,
    IArtist,
    IRecentlyPlayed,
    ITopTracks,
    ITrack,
    IUserProfile,
} from '../client/spotify-types';
import { reduceItemArtists, appendUUID } from './helpers';
import {
    IAlbumDTO,
    IArtistDTO,
    IRecentlyPlayedDTO,
    ITopTracksDTO,
    ITrackDTO,
    IUserProfileDTO,
} from './spotify-types';

export const reduceAlbum = async (
    album: IAlbumDTO,
    imageSize?: AlbumImageSize
): Promise<IAlbumReduced> => {
    const color = await getAverageColor(album.images[2].url);
    return {
        id: album.id,
        color: color.hex,
        image: album.images[imageSize ?? 2].url,
        key: appendUUID(album.id),
        name: album.name,
        release_date: album.release_date,
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
    albumDTOs: IAlbumDTO[],
    imageSize?: AlbumImageSize
): Promise<IAlbum[]> => {
    return await Promise.all(
        albumDTOs.map(async (track) => await buildAlbum(track, imageSize))
    );
};

export const buildArtist = (data: IArtistDTO): IArtist => ({
    followers: data.followers.total,
    genres: data.genres,
    id: data.id,
    images: data.images,
    key: appendUUID(data.id),
    name: data.name,
    popularity: data.popularity,
    type: data.type,
});

export const buildTrack = async (
    data: ITrackDTO,
    imageSize?: AlbumImageSize
): Promise<ITrack> => ({
    id: data.id,
    album: await reduceAlbum(data.album, imageSize),
    artists: reduceItemArtists(data.artists),
    key: appendUUID(data.id),
    name: data.name,
    popularity: data.popularity,
    type: data.type,
});

export const buildTracks = async (
    trackDTOs: ITrackDTO[],
    imageSize?: AlbumImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackDTOs.map(async (track) => await buildTrack(track, imageSize))
    );
};

export const buildRecentlyPlayed = async (
    data: IRecentlyPlayedDTO
): Promise<IRecentlyPlayed> => ({
    items: await buildTracks(data.items.map((item) => item.track)),
});

export const buildTopTracks = async (
    data: ITopTracksDTO
): Promise<ITopTracks> => ({
    items: await buildTracks(data.items),
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

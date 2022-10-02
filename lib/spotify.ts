import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { appendUUID, reduceAlbum, reduceItemArtists } from './helpers';
import {
    AlbumImageSize,
    IAlbum,
    IArtist,
    IArtistDTO,
    IRecentlyPlayed,
    IRecentlyPlayedDTO,
    ITopTracks,
    ITopTracksDTO,
    ITrack,
    ITrackDTO,
    IUserProfile,
    IUserProfileDTO,
} from './types/spotify';

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum> => {
    const { data: album }: { data: IAlbum } = await axios.get(
        '/api/spotify/getAlbum',
        {
            params: { albumId: queryKey[1] },
        }
    );
    return album;
};

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum[]> => {
    const { data: albums }: { data: IAlbum[] } = await axios.get(
        '/api/spotify/getAlbums',
        {
            params: { albumIds: queryKey[1] },
        }
    );
    return albums;
};

const buildArtist = (data: IArtistDTO): IArtist => ({
    followers: data.followers.total,
    genres: data.genres,
    id: data.id,
    images: data.images,
    key: appendUUID(data.id),
    name: data.name,
    popularity: data.popularity,
    type: data.type,
});

export const getArtist = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IArtist> => {
    const { data }: { data: IArtistDTO } = await axios.get(
        '/api/spotify/getArtist',
        {
            params: { artistId: queryKey[1] },
        }
    );
    return buildArtist(data);
};

const buildTrack = async (
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

export const getTrack = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<ITrack> => {
    const { data }: { data: ITrackDTO } = await axios.get(
        '/api/spotify/getTrack',
        {
            params: { trackId: queryKey[1] },
        }
    );
    return buildTrack(data);
};

const buildTracks = async (
    trackDTOs: ITrackDTO[],
    imageSize?: AlbumImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackDTOs.map(async (track) => await buildTrack(track, imageSize))
    );
};

const buildRecentlyPlayed = async (
    data: IRecentlyPlayedDTO
): Promise<IRecentlyPlayed> => ({
    items: await buildTracks(data.items.map((item) => item.track)), //.map((item) => buildTrack(item.track)),
});

export const getRecentlyPlayed = async (): Promise<IRecentlyPlayed> => {
    const { data }: { data: IRecentlyPlayedDTO } = await axios.get(
        '/api/spotify/getRecentlyPlayed'
    );
    return buildRecentlyPlayed(data);
};

export const getRecentlyPlayedTrack = async (): Promise<ITrack> => {
    const { data }: { data: IRecentlyPlayedDTO } = await axios.get(
        '/api/spotify/getRecentlyPlayed'
    );
    return buildTrack(data.items[0].track, AlbumImageSize.medium);
};

const buildTopTracks = async (data: ITopTracksDTO): Promise<ITopTracks> => ({
    items: await buildTracks(data.items), //.map((item) => buildTrack(item.track)),
});

export const getTopTracks = async (): Promise<ITopTracks> => {
    const { data }: { data: ITopTracksDTO } = await axios.get(
        '/api/spotify/getTopTracks'
    );
    return buildTopTracks(data);
};

const buildUserProfile = (data: IUserProfileDTO): IUserProfile => ({
    country: data.country,
    display_name: data.display_name,
    followers: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    product: data.product,
    type: data.type,
});

export const getUserProfile = async (): Promise<IUserProfile> => {
    const { data }: { data: IUserProfileDTO } = await axios.get(
        '/api/spotify/getUserProfile'
    );
    return buildUserProfile(data);
};

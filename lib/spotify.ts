import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbum,
    IAlbumDTO,
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
} from '../lib/interfaces/spotify';
import { appendUUID, reduceAlbum, reduceItemArtists } from './helpers';

const buildAlbum = (data: IAlbumDTO): IAlbum => ({
    album_type: data.album_type,
    artists: reduceItemArtists(data.artists),
    id: data.id,
    images: data.images,
    key: appendUUID(data.id),
    name: data.name,
    release_date: data.release_date,
    total_tracks: data.total_tracks,
    type: data.type,
});

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum> => {
    const { data }: { data: IAlbumDTO } = await axios.get(
        '/api/spotify/getAlbum',
        {
            params: { albumId: queryKey[1] },
        }
    );
    return buildAlbum(data);
};

const buildAlbums = (data: IAlbumDTO[]): IAlbum[] =>
    data.map((item) => ({
        album_type: item.album_type,
        artists: reduceItemArtists(item.artists),
        id: item.id,
        images: item.images,
        key: appendUUID(item.id),
        name: item.name,
        release_date: item.release_date,
        total_tracks: item.total_tracks,
        type: item.type,
    }));

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum[]> => {
    const { data }: { data: IAlbumDTO[] } = await axios.get(
        '/api/spotify/getAlbums',
        {
            params: { albumIds: queryKey[1] },
        }
    );
    return buildAlbums(data);
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

const buildTrack = (data: ITrackDTO): ITrack => ({
    album: reduceAlbum(data.album),
    artists: reduceItemArtists(data.artists),
    id: data.id,
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

const buildRecentlyPlayed = (data: IRecentlyPlayedDTO): IRecentlyPlayed => ({
    items: data.items.map((item) => buildTrack(item.track)),
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
    return buildTrack(data.items[0].track);
};

const buildTopTracks = (data: ITopTracksDTO): ITopTracks => ({
    items: data.items.map((item) => ({
        album: reduceAlbum(item.album),
        artists: reduceItemArtists(item.artists),
        id: item.id,
        key: appendUUID(item.id),
        name: item.name,
        popularity: item.popularity,
        type: item.type,
    })),
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

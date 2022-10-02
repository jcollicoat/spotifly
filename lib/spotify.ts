import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbum,
    IArtist,
    IRecentlyPlayed,
    ITopTracks,
    ITrack,
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

export const getArtist = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IArtist> => {
    const { data: artist }: { data: IArtist } = await axios.get(
        '/api/spotify/getArtist',
        {
            params: { artistId: queryKey[1] },
        }
    );
    return artist;
};

export const getTrack = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<ITrack> => {
    const { data: track }: { data: ITrack } = await axios.get(
        '/api/spotify/getTrack',
        {
            params: { trackId: queryKey[1] },
        }
    );
    return track;
};

export const getRecentlyPlayed = async (): Promise<IRecentlyPlayed> => {
    const { data: recentlyPlayed }: { data: IRecentlyPlayed } = await axios.get(
        '/api/spotify/getRecentlyPlayed'
    );
    return recentlyPlayed;
};

export const getRecentlyPlayedNumber = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IRecentlyPlayed> => {
    const { data: recentlyPlayed }: { data: IRecentlyPlayed } = await axios.get(
        '/api/spotify/getRecentlyPlayed',
        {
            params: { limit: queryKey[1] },
        }
    );
    return recentlyPlayed;
};

export const getRecentlyPlayedSingle = async (): Promise<IRecentlyPlayed> => {
    const { data: recentlyPlayedSingle }: { data: IRecentlyPlayed } =
        await axios.get('/api/spotify/getRecentlyPlayed', {
            params: { limit: '1' },
        });
    return recentlyPlayedSingle;
};

export const getTopTracks = async (): Promise<ITopTracks> => {
    const { data: topTracks }: { data: ITopTracks } = await axios.get(
        '/api/spotify/getTopTracks'
    );
    return topTracks;
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

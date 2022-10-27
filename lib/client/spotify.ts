import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { IAlbum } from '../albums/types';
import { IArtist, ITopArtists } from '../artists/types';
import { ITrack, IRecentlyPlayed, ITopTracks } from '../tracks/types';
import { IUserProfile } from '../user/types';

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum> => {
    const { data: album }: { data: IAlbum } = await axios.get(
        '/api/spotify/getAlbum',
        {
            params: { albumID: queryKey[1] },
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
            params: { albumIDs: queryKey[1] },
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
            params: { artistID: queryKey[1] },
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
            params: { trackID: queryKey[1] },
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
    const { data: recentlyPlayed }: { data: IRecentlyPlayed } = await axios.get(
        '/api/spotify/getRecentlyPlayed',
        {
            params: { limit: '1' },
        }
    );
    return recentlyPlayed;
};

export const getTopArtists = async (): Promise<ITopArtists> => {
    const { data: topArtists }: { data: ITopArtists } = await axios.get(
        '/api/spotify/getTopArtists'
    );
    return topArtists;
};

export const getTopTracks = async (): Promise<ITopTracks> => {
    const { data: topTracks }: { data: ITopTracks } = await axios.get(
        '/api/getTopTracks'
    );
    return topTracks;
};

export const getUserProfile = async (): Promise<IUserProfile> => {
    const { data: user }: { data: IUserProfile } = await axios.get(
        '/api/spotify/getUserProfile'
    );
    return user;
};

import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { IAlbum } from '../albums/types';
import { IArtist, ITopArtists } from '../artists/types';
import {
    ITrack,
    ITracks,
    RecentlyPlayedMeta,
    TopTracksMeta,
} from '../tracks/types';
import { IUserProfile } from '../user/types';

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum> => {
    const { data: album }: { data: IAlbum } = await axios.get('/api/getAlbum', {
        params: { albumID: queryKey[1] },
    });
    return album;
};

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbum[]> => {
    const { data: albums }: { data: IAlbum[] } = await axios.get(
        '/api/getAlbums',
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
    const { data: track }: { data: ITrack } = await axios.get('/api/getTrack', {
        params: { trackID: queryKey[1] },
    });
    return track;
};

export const getRecentlyPlayed = async (): Promise<
    ITracks<RecentlyPlayedMeta>
> => {
    const { data: recentlyPlayed }: { data: ITracks<RecentlyPlayedMeta> } =
        await axios.get('/api/spotify/getRecentlyPlayed');
    return recentlyPlayed;
};

export const getRecentlyPlayedNumber = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<ITracks<RecentlyPlayedMeta>> => {
    const { data: recentlyPlayed }: { data: ITracks<RecentlyPlayedMeta> } =
        await axios.get('/api/spotify/getRecentlyPlayed', {
            params: { limit: queryKey[1] },
        });
    return recentlyPlayed;
};

export const getRecentlyPlayedSingle = async (): Promise<
    ITracks<RecentlyPlayedMeta>
> => {
    const { data: recentlyPlayed }: { data: ITracks<RecentlyPlayedMeta> } =
        await axios.get('/api/getRecentlyPlayed', {
            params: { limit: '1' },
        });
    return recentlyPlayed;
};

export const getTopArtists = async (): Promise<ITopArtists> => {
    const { data: topArtists }: { data: ITopArtists } = await axios.get(
        '/api/spotify/getTopArtists'
    );
    return topArtists;
};

export const getTopTracks = async (): Promise<ITracks<TopTracksMeta>> => {
    const { data: topTracks }: { data: ITracks<TopTracksMeta> } =
        await axios.get('/api/getTopTracks');
    return topTracks;
};

export const getUserProfile = async (): Promise<IUserProfile> => {
    const { data: user }: { data: IUserProfile } = await axios.get(
        '/api/spotify/getUserProfile'
    );
    return user;
};

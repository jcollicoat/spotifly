import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { Album } from '../albums/types';
import { Artist, TopArtists } from '../artists/types';
import {
    Track,
    Tracks,
    RecentlyPlayedMeta,
    TopTracksMeta,
} from '../tracks/types';
import { UserProfile } from '../user/types';

export const getAlbum = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<Album> => {
    const { data: album }: { data: Album } = await axios.get('/api/getAlbum', {
        params: { albumID: queryKey[1] },
    });
    return album;
};

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<Album[]> => {
    const { data: albums }: { data: Album[] } = await axios.get(
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
}): Promise<Artist> => {
    const { data: artist }: { data: Artist } = await axios.get(
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
}): Promise<Track> => {
    const { data: track }: { data: Track } = await axios.get('/api/getTrack', {
        params: { trackID: queryKey[1] },
    });
    return track;
};

export const getRecentlyPlayed = async (): Promise<
    Tracks<RecentlyPlayedMeta>
> => {
    const { data: recentlyPlayed }: { data: Tracks<RecentlyPlayedMeta> } =
        await axios.get('/api/spotify/getRecentlyPlayed');
    return recentlyPlayed;
};

export const getRecentlyPlayedNumber = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<Tracks<RecentlyPlayedMeta>> => {
    const { data: recentlyPlayed }: { data: Tracks<RecentlyPlayedMeta> } =
        await axios.get('/api/spotify/getRecentlyPlayed', {
            params: { limit: queryKey[1] },
        });
    return recentlyPlayed;
};

export const getRecentlyPlayedSingle = async (): Promise<
    Tracks<RecentlyPlayedMeta>
> => {
    const { data: recentlyPlayed }: { data: Tracks<RecentlyPlayedMeta> } =
        await axios.get('/api/getRecentlyPlayed', {
            params: { limit: '1' },
        });
    return recentlyPlayed;
};

export const getTopArtists = async (): Promise<TopArtists> => {
    const { data: topArtists }: { data: TopArtists } = await axios.get(
        '/api/spotify/getTopArtists'
    );
    return topArtists;
};

export const getTopTracks = async (): Promise<Tracks<TopTracksMeta>> => {
    const { data: topTracks }: { data: Tracks<TopTracksMeta> } =
        await axios.get('/api/getTopTracks');
    return topTracks;
};

export const getUserProfile = async (): Promise<UserProfile> => {
    const { data: user }: { data: UserProfile } = await axios.get(
        '/api/spotify/getUserProfile'
    );
    return user;
};

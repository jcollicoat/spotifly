import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbum,
    IAlbumDTO,
    IArtistDTO,
    IRecentlyPlayed,
    IRecentlyPlayedDTO,
    ITopTracks,
    ITopTracksDTO,
    ITrack,
    ITrackDTO,
    IUserProfileDTO,
} from '../lib/interfaces/spotify';
import { transformId } from './helpers';

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
    const unique_id = transformId(data.id);
    const album: IAlbum = {
        album_type: data.album_type,
        artists: data.artists,
        id: data.id,
        images: data.images,
        name: data.name,
        release_date: data.release_date,
        total_tracks: data.total_tracks,
        type: data.type,
        unique_id: unique_id,
    };
    return album;
};

export const getAlbums = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IAlbumDTO[]> => {
    const { data } = await axios.get('/api/spotify/getAlbums', {
        params: { albumIds: queryKey[1] },
    });
    return data;
};

export const getArtist = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<IArtistDTO> => {
    const { data } = await axios.get('/api/spotify/getArtist', {
        params: { artistId: queryKey[1] },
    });
    return data;
};

const buildRecentlyPlayed = (data: IRecentlyPlayedDTO): IRecentlyPlayed => {
    const recentlyPlayed: ITrack[] = data.items.map((item) => {
        return {
            album: item.track.album,
            artists: item.track.artists,
            id: item.track.id,
            name: item.track.name,
            popularity: item.track.popularity,
            type: item.track.type,
            unique_id: transformId(item.track.id),
        };
    });
    return { items: recentlyPlayed };
};

export const getRecentlyPlayed = async (): Promise<IRecentlyPlayed> => {
    const { data } = await axios.get('/api/spotify/getRecentlyPlayed');
    const builtRecentlyPlayed = buildRecentlyPlayed(data);
    return builtRecentlyPlayed;
};

const buildTopTracks = (data: ITopTracksDTO): ITopTracks => {
    const topTracks: ITrack[] = data.items.map((item) => {
        return {
            album: item.album,
            artists: item.artists,
            id: item.id,
            name: item.name,
            popularity: item.popularity,
            type: item.type,
            unique_id: transformId(item.id),
        };
    });
    return { items: topTracks };
};

export const getTopTracks = async (): Promise<ITopTracks> => {
    const { data } = await axios.get('/api/spotify/getTopTracks');
    const builtTopTracks = buildTopTracks(data);
    return builtTopTracks;
};

export const getTrack = async ({
    queryKey,
}: {
    queryKey: QueryKey;
}): Promise<ITrackDTO> => {
    const { data } = await axios.get('/api/spotify/getTrack', {
        params: { trackId: queryKey[1] },
    });
    return data;
};

export const getUserProfile = async (): Promise<IUserProfileDTO> => {
    const { data } = await axios.get('/api/spotify/getUserProfile');
    return data;
};

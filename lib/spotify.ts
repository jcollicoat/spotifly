import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import {
    IAlbum,
    IAlbumDTO,
    IArtistDTO,
    IRecentlyPlayedDTO,
    ITopTracksDTO,
    ITrackDTO,
    IUserProfileDTO,
} from '../lib/interfaces/spotify';

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

export const getRecentlyPlayed = async (): Promise<IRecentlyPlayedDTO> => {
    const { data } = await axios.get('/api/spotify/getRecentlyPlayed');
    return data;
};

export const getTopTracks = async (): Promise<ITopTracksDTO> => {
    const { data } = await axios.get('/api/spotify/getTopTracks');
    return data;
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

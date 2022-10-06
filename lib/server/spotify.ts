import { getAverageColor } from 'fast-average-color-node';
import { IAddonsTopTracksAPI } from '../../pages/api/spotify/getTopTracks';
import {
    AlbumImageSize,
    IAlbum,
    IAlbumMinimum,
    IAudioFeatures,
    // IArtist,
    IRecentlyPlayed,
    ISmallListArtist,
    ISmallListTrack,
    ITopArtists,
    ITrack,
    IUserProfile,
} from '../client/spotify-types';
import { reduceItemArtists, appendUUID } from './helpers';
import {
    IAlbumDTO,
    IAlbumsDTO,
    IArtistDTO,
    IAudioFeaturesDTO,
    IRecentlyPlayedDTO,
    ITopArtistsDTO,
    ITrackAPI,
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

const reduceAudioFeatures = (
    audioFeaturesDTO: IAudioFeaturesDTO
): IAudioFeatures => ({
    acousticness: audioFeaturesDTO.acousticness,
    danceability: audioFeaturesDTO.danceability,
    duration_ms: audioFeaturesDTO.duration_ms,
    energy: audioFeaturesDTO.energy,
    id: audioFeaturesDTO.id,
    instrumentalness: audioFeaturesDTO.instrumentalness,
    key: appendUUID(audioFeaturesDTO.id),
    liveness: audioFeaturesDTO.liveness,
    loudness: audioFeaturesDTO.loudness,
    mode: audioFeaturesDTO.mode,
    song_key: audioFeaturesDTO.key,
    speechiness: audioFeaturesDTO.speechiness,
    tempo: audioFeaturesDTO.tempo,
    time_signature: audioFeaturesDTO.time_signature,
    valence: audioFeaturesDTO.valence,
});

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

export const buildTrack = async (
    trackDTO: ITrackDTO,
    addons?: IAddonsTopTracksAPI,
    imageSize?: AlbumImageSize
): Promise<ITrack> => {
    const color = await getAverageColor(trackDTO.album.images[2].url);

    if (addons) {
        const audio_features = addons.audio_features?.audio_features.find(
            (set) => set.id === trackDTO.id
        );

        const track: ITrack = {
            id: trackDTO.id,
            album: reduceAlbum(trackDTO.album),
            artists: reduceItemArtists(trackDTO.artists),
            audio_features:
                audio_features && reduceAudioFeatures(audio_features),
            color: color.hex,
            image: trackDTO.album.images[imageSize ?? 2].url,
            key: appendUUID(trackDTO.id),
            name: trackDTO.name,
            popularity: trackDTO.popularity,
            type: trackDTO.type,
        };
        return track;
    }

    const track: ITrack = {
        id: trackDTO.id,
        album: reduceAlbum(trackDTO.album),
        artists: reduceItemArtists(trackDTO.artists),
        audio_features:
            trackDTO.audio_features &&
            reduceAudioFeatures(trackDTO.audio_features),
        color: color.hex,
        image: trackDTO.album.images[imageSize ?? 2].url,
        key: appendUUID(trackDTO.id),
        name: trackDTO.name,
        popularity: trackDTO.popularity,
        type: trackDTO.type,
    };
    return track;
};

export const buildTracks = async (
    trackAPIs: ITrackAPI[],
    addons?: IAddonsTopTracksAPI,
    imageSize?: AlbumImageSize
): Promise<ISmallListTrack[]> => {
    return await Promise.all(
        trackAPIs.map(
            async (track) => await buildTrack(track, addons, imageSize)
        )
    );
};

export const buildRecentlyPlayed = async (
    data: IRecentlyPlayedDTO
): Promise<IRecentlyPlayed<ISmallListTrack>> => {
    const items: ISmallListTrack[] = await buildTracks(
        data.items.map((item) => item.track),
        undefined,
        AlbumImageSize.small
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

export const buildArtist = async (
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

export const buildUserProfile = (data: IUserProfileDTO): IUserProfile => ({
    country: data.country,
    display_name: data.display_name,
    followers: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    product: data.product,
    type: data.type,
});

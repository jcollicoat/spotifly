import { getAverageColor } from 'fast-average-color-node';
import {
    AlbumImageSize,
    IAlbum,
    IAlbumMinimum,
    IAudioFeatures,
    // IArtist,
    ISmallListArtist,
    ISmallListTrack,
    ITopArtists,
    ITrack,
    IUserProfile,
} from '../client/spotify-types';
import { reduceItemArtists, appendUUID } from './helpers';
import {
    IAddonsTracksAPI,
    IAlbumDTO,
    IAlbumsDTO,
    IArtistDTO,
    IAudioFeaturesAPI,
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

const normalizeFloat = (value: number) => Math.floor(value * 100);

const mapMusicKey = (value: number) => {
    const scale = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
    ];
    return scale[value] ?? 'Unknown';
};

const normalizeTimeSig = (value: number) => {
    if (value < 3 || value > 7) {
        return '4/4';
    }
    return `${value}/4`;
};

const reduceAudioFeatures = (
    audioFeaturesDTO: IAudioFeaturesAPI
): IAudioFeatures => ({
    acousticness: normalizeFloat(audioFeaturesDTO.acousticness),
    danceability: normalizeFloat(audioFeaturesDTO.danceability),
    duration_ms: audioFeaturesDTO.duration_ms,
    energy: normalizeFloat(audioFeaturesDTO.energy),
    id: audioFeaturesDTO.id,
    instrumentalness: normalizeFloat(audioFeaturesDTO.instrumentalness),
    key: appendUUID(audioFeaturesDTO.id),
    liveness: normalizeFloat(audioFeaturesDTO.liveness),
    loudness: Math.floor(((audioFeaturesDTO.loudness + 60) / 60) * 100),
    mode: audioFeaturesDTO.mode === 1 ? 'Major' : 'Minor',
    music_key: mapMusicKey(audioFeaturesDTO.key),
    speechiness: normalizeFloat(audioFeaturesDTO.speechiness),
    tempo: Math.floor(audioFeaturesDTO.tempo),
    time_signature: normalizeTimeSig(audioFeaturesDTO.time_signature),
    valence: normalizeFloat(audioFeaturesDTO.valence),
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
    addons?: IAddonsTracksAPI,
    imageSize?: AlbumImageSize
): Promise<ITrack> => {
    const color = await getAverageColor(trackDTO.album.images[2].url);
    if (!color.hex) {
        throw new Error(
            `Error getting color for track: ${trackDTO.id} (${trackDTO.name}).`
        );
    }

    if (addons) {
        const audio_features = addons.audio_features?.audio_features.find(
            (featureSet) => featureSet.id === trackDTO.id
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
    addons?: IAddonsTracksAPI,
    imageSize?: AlbumImageSize
): Promise<ISmallListTrack[]> => {
    return await Promise.all(
        trackAPIs.map(
            async (track) => await buildTrack(track, addons, imageSize)
        )
    );
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

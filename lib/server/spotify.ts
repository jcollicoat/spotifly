import { IAlbumAPI } from '../../pages/api/spotify/getAlbum';
import { buildArtist, IArtistAPI } from '../../pages/api/spotify/getArtist';
import { buildTrack, ITrackAPI } from '../../pages/api/spotify/getTrack';
import {
    IAlbumMinimum,
    AlbumImageSize,
    IArtistMinimum,
} from '../client/types/_simple';
import { IAudioFeatures } from '../client/types/addons';
import { IArtist } from '../client/types/artists';
import { ITrack } from '../client/types/tracks';
import { appendUUID } from './helpers';
import { ITrackArtistDTO } from './types/_simple';
import { IAddonsTracksDTO, IAudioFeaturesAPI } from './types/addons';

export const reduceAlbum = (album: IAlbumAPI): IAlbumMinimum => {
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

export const reduceAudioFeatures = (
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

export const reduceArtists = (
    artists: IArtistAPI[] | ITrackArtistDTO[]
): IArtistMinimum[] =>
    artists.map((artist) => ({
        id: artist.id,
        key: appendUUID(artist.id),
        name: artist.name,
    }));

export const buildTracks = async (
    trackAPIs: ITrackAPI[],
    addons?: IAddonsTracksDTO,
    imageSize?: AlbumImageSize
): Promise<ITrack[]> => {
    return await Promise.all(
        trackAPIs.map(
            async (track) => await buildTrack(track, addons, imageSize)
        )
    );
};

export const buildArtists = async (
    artists: IArtistAPI[],
    imageSize?: AlbumImageSize
): Promise<IArtist[]> => {
    return await Promise.all(
        artists.map(async (artist) => await buildArtist(artist, imageSize))
    );
};

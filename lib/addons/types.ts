import { ITrack } from '../tracks/types';

interface IAudioFeature {
    related_tracks: ITrack[];
    value: number;
}

export interface IAudioFeatures {
    acousticness: number;
    danceability: IAudioFeature;
    duration_ms: number;
    energy: IAudioFeature;
    instrumentalness: IAudioFeature;
    liveness: IAudioFeature;
    loudness: number;
    mode: IAudioFeature;
    music_key: string;
    speechiness: number;
    tempo: IAudioFeature;
    time_signature: string;
    valence: IAudioFeature;
}

export interface IAddonsTrack {
    audio_features: IAudioFeatures;
}

export interface IAudioFeaturesAPI {
    id: string;
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
}

export interface IAudioFeaturesListAPI {
    audio_features: IAudioFeaturesAPI[];
}

export interface IAddonsAlbum {
    audio_features?: IAudioFeatures;
}

export interface IAddonsDTO {
    audio_features?: IAudioFeaturesListAPI;
}

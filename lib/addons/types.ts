export interface IAudioFeatures {
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    mode: 'Major' | 'Minor';
    music_key: string;
    speechiness: number;
    tempo: number;
    time_signature: string;
    valence: number;
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

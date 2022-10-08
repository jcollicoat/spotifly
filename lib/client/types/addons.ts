export interface IAudioFeatures {
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: string;
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

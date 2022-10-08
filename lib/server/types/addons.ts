export interface IAudioFeaturesAPI {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
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

export interface IAddonsTracksDTO {
    audio_features?: IAudioFeaturesListAPI;
}

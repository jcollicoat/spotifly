// Client

export interface AudioFeatures {
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    mode: string;
    music_key: string;
    speechiness: number;
    tempo: number;
    time_signature: string;
    valence: number;
}

// Server

export interface AudioFeaturesDTO {
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

export interface AudioFeaturesListDTO {
    audio_features: AudioFeaturesDTO[];
}

export interface AddonsDTO {
    audio_features?: AudioFeaturesListDTO;
}

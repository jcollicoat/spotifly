// Client

export interface IAudioFeatures {
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

export interface IAddonsTrack {
    audio_features: IAudioFeatures;
}

// Server

export interface IGetAudioFeaturesAPI {
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

export interface IGetAudioFeaturesListAPI {
    audio_features: IGetAudioFeaturesAPI[];
}

export interface IAudioFeaturesListsDTO {
    audio_features: IGetAudioFeaturesAPI[];
    id?: string;
}

export interface IAddonsAlbum {
    audio_features?: IAudioFeatures;
}

export interface IAddonsDTO {
    audio_features?: IGetAudioFeaturesListAPI;
}

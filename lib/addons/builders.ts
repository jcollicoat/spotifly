import { getFloats } from '../server/helpers';
import {
    IAudioFeatures,
    IAudioFeaturesAPI,
    IAudioFeaturesListAPI,
} from './types';

const normalizeFloats = (audioFeaturesAPI: IAudioFeaturesAPI) => {
    const floats = getFloats(audioFeaturesAPI);
    Object.keys(floats).forEach(
        (float) => (floats[float] = Math.floor(floats[float] * 100))
    );
    return floats;
};

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

const average = (values: number[]) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length || 0;
};

const normalizeFloat = (value: number) => Math.floor(value * 100);

const averageFloat = (values: number[]) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return normalizeFloat(sum / values.length) || 0;
};

export const averageAudioFeaturesList = (
    audioFeaturesListAPI: IAudioFeaturesListAPI
): IAudioFeatures => {
    const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        loudness,
        speechiness,
        valence,
    } = audioFeaturesListAPI.audio_features;
    return {
        acousticness: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.acousticness
            )
        ),
        danceability: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.danceability
            )
        ),
        duration_ms: average(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.duration_ms
            )
        ),
        energy: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.energy
            )
        ),
        instrumentalness: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.instrumentalness
            )
        ),
        liveness: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.liveness
            )
        ),
        loudness: '',
        mode: '',
        music_key: '',
        tempo: '',
        time_signature: '',
        speechiness: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.speechiness
            )
        ),
        valence: averageFloat(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.valence
            )
        ),
    };
};

export const reduceAudioFeatures = (
    audioFeaturesAPI: IAudioFeaturesAPI
): IAudioFeatures => {
    const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        speechiness,
        valence,
    } = normalizeFloats(audioFeaturesAPI);
    return {
        acousticness: acousticness,
        danceability: danceability,
        duration_ms: audioFeaturesAPI.duration_ms,
        energy: energy,
        instrumentalness: instrumentalness,
        liveness: liveness,
        loudness: Math.floor(((audioFeaturesAPI.loudness + 60) / 60) * 100),
        mode: audioFeaturesAPI.mode === 1 ? 'Major' : 'Minor',
        music_key: mapMusicKey(audioFeaturesAPI.key),
        speechiness: speechiness,
        tempo: Math.floor(audioFeaturesAPI.tempo),
        time_signature: normalizeTimeSig(audioFeaturesAPI.time_signature),
        valence: valence,
    };
};

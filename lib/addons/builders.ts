import {
    IAudioFeatures,
    IAudioFeaturesAPI,
    IAudioFeaturesListAPI,
} from './types';

export const getFloats = (audioFeaturesAPI: IAudioFeaturesAPI) => {
    const asArray = Object.entries(audioFeaturesAPI);
    const filtered = asArray.filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, value]) => typeof value === 'number' && value >= 0 && value <= 1
    );
    return Object.fromEntries(filtered);
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

const normalizeFloats = (audioFeaturesAPI: IAudioFeaturesAPI) => {
    const floats = getFloats(audioFeaturesAPI);
    Object.keys(floats).forEach(
        (float) => (floats[float] = Math.floor(floats[float] * 100))
    );
    return floats;
};

const normalizeTimeSig = (value: number) => {
    if (value < 3 || value > 7) {
        return '4/4';
    }
    return `${value}/4`;
};

export const buildAudioFeatures = (
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
        duration_ms: Math.floor(audioFeaturesAPI.duration_ms),
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

const getAverageValue = (values: number[]) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length || 0;
};

const getMostCommonValue = (values: (string | number)[]) => {
    return (
        values
            .sort(
                (a, b) =>
                    values.filter((c) => c === a).length -
                    values.filter((c) => c === b).length
            )
            .pop() ?? values[0]
    );
};

export const buildAudioFeaturesList = (
    audioFeaturesListAPI: IAudioFeaturesListAPI
): IAudioFeatures => {
    const combined: IAudioFeaturesAPI = {
        id: '',
        acousticness: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.acousticness
            )
        ),
        analysis_url: '',
        danceability: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.danceability
            )
        ),
        duration_ms: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.duration_ms
            )
        ),
        energy: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.energy
            )
        ),
        instrumentalness: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.instrumentalness
            )
        ),
        key: getMostCommonValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.key
            )
        ) as number,
        liveness: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.liveness
            )
        ),
        loudness: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.loudness
            )
        ),
        mode: getMostCommonValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.mode
            )
        ) as number,
        speechiness: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.speechiness
            )
        ),
        tempo: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.tempo
            )
        ),
        time_signature: getMostCommonValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.time_signature
            )
        ) as number,
        track_href: '',
        type: '',
        uri: '',
        valence: getAverageValue(
            audioFeaturesListAPI.audio_features.map(
                (featureSet) => featureSet.valence
            )
        ),
    };

    return buildAudioFeatures(combined);
};

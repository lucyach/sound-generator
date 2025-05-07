import React from 'react';

function SoundGenerator({
    frequency,
    setFrequency,
    volume,
    setVolume,
    duration,
    setDuration,
    detune,
    setDetune,
    attack,
    setAttack,
    release,
    setRelease,
    waveform,
    setWaveform,
    playSound,
    addNoteToSequence,
}) {
    return (
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Note</h2>

            {/* Frequency */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Frequency (Hz)</label>
                <input
                    type="number"
                    value={frequency || ''}
                    onChange={(e) => setFrequency(e.target.value ? parseFloat(e.target.value) : 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Volume */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Volume</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume || 0}
                    onChange={(e) => setVolume(e.target.value ? parseFloat(e.target.value) : 0)}
                    className="w-full"
                />
            </div>

            {/* Duration */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Duration (ms)</label>
                <input
                    type="number"
                    value={duration || ''}
                    onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value, 10) : 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Detune */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Detune (cents)</label>
                <input
                    type="range"
                    min="-1200"
                    max="1200"
                    step="10"
                    value={detune || 0}
                    onChange={(e) => setDetune(e.target.value ? parseInt(e.target.value, 10) : 0)}
                    className="w-full"
                />
            </div>

            {/* Attack */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Attack (ms)</label>
                <input
                    type="number"
                    value={attack || ''}
                    onChange={(e) => setAttack(e.target.value ? parseInt(e.target.value, 10) : 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Release */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Release (ms)</label>
                <input
                    type="number"
                    value={release || ''}
                    onChange={(e) => setRelease(e.target.value ? parseInt(e.target.value, 10) : 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Waveform */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Waveform</label>
                <select
                    value={waveform}
                    onChange={(e) => setWaveform(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                >
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={() =>
                        playSound({
                            frequency,
                            duration,
                            attack,
                            release,
                            waveform,
                            volume,
                            detune,
                        })
                    }
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                >
                    Play Note
                </button>
                <button
                    onClick={addNoteToSequence}
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Add Note to Sequence
                </button>
            </div>
        </div>
    );
}

export default SoundGenerator;
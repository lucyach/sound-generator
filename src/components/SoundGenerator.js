import React from 'react';

function SoundGenerator({ frequency, setFrequency, volume, setVolume, duration, setDuration, detune, setDetune, playSound, addNoteToSequence }) {
    return (
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Note</h2>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Frequency (Hz)</label>
                <input
                    type="number"
                    value={frequency || ''}
                    onChange={(e) => setFrequency(e.target.value ? parseFloat(e.target.value) : 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
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
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Duration (ms)</label>
                <input
                    type="number"
                    value={duration || ''}
                    onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value, 10) : 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
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
            <div className="flex space-x-4">
                <button
                    onClick={() => playSound(frequency, duration)}
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
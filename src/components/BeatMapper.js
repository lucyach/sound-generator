import React from 'react';

function BeatMapper({ sequence, updateNote, playSequence, clearSequence }) {
    return (
        <div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Beat Sequencer</h2>
            {sequence.map((step, index) => (
                <div key={index} className="flex items-center mb-4">
                    <span className="w-1/3 p-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg mr-2">
                        {`sound${index + 1}`}
                    </span>
                    <input
                        type="number"
                        value={step.frequency}
                        onChange={(e) => updateNote(index, 'frequency', parseFloat(e.target.value) || 0)}
                        className="w-1/3 p-2 bg-white text-gray-700 border border-gray-300 rounded-lg mr-2"
                        placeholder="Frequency (Hz)"
                    />
                    <input
                        type="number"
                        value={step.duration}
                        onChange={(e) => updateNote(index, 'duration', parseInt(e.target.value, 10) || 0)}
                        className="w-1/3 p-2 bg-white text-gray-700 border border-gray-300 rounded-lg mr-2"
                        placeholder="Duration (ms)"
                    />
                </div>
            ))}
            <button
                onClick={playSequence}
                className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
            >
                Play Sequence
            </button>
            <button
                onClick={clearSequence}
                className="ml-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
            >
                Clear Sequence
            </button>
        </div>
    );
}

export default BeatMapper;
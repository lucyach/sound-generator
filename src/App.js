"use client";

import React, { useState } from 'react';

function App() {
    const [frequency, setFrequency] = useState(440);
    const [waveform, setWaveform] = useState('sine');

    const playSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 500); // Play for 500ms
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-extrabold text-white mb-8">Sound Generator</h1>
            <div className="mb-6 w-full max-w-md">
            <div className="bg-red-500 text-white p-4">
                If you see a red background, Tailwind CSS is working!
            </div>
                <label className="block text-lg font-medium text-white mb-2">
                    Frequency (Hz): <span className="font-bold">{frequency}</span>
                </label>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <div className="mb-6 w-full max-w-md">
                <label className="block text-lg font-medium text-white mb-2">Waveform</label>
                <select
                    value={waveform}
                    onChange={(e) => setWaveform(e.target.value)}
                    className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
            <button
                onClick={playSound}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            >
                Play Sound
            </button>
        </div>
    );
}

export default App;
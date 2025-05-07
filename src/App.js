"use client";

import React, { useState } from 'react';

function App() {
    const [frequency, setFrequency] = useState(440);
    const [waveform, setWaveform] = useState('sine');
    const [volume, setVolume] = useState(0.5);
    const [duration, setDuration] = useState(500);
    const [detune, setDetune] = useState(0);

    const notes = {
        C4: 261.63,
        D4: 293.66,
        E4: 329.63,
        F4: 349.23,
        G4: 392.00,
        A4: 440.00,
        B4: 493.88,
        C5: 523.25,
    };

    const playSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.detune.setValueAtTime(detune, audioContext.currentTime); // Detune in cents
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime); // Volume

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, duration); // Play for the specified duration
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
            <script src="https://cdn.tailwindcss.com"></script>
            <h1 className="text-4xl font-extrabold text-white mb-8">Advanced Sound Generator</h1>

            {/* Note Selector */}
            <div className="mb-6 w-full max-w-md">
                <label className="block text-lg font-medium text-white mb-2">Select Note</label>
                <select
                    onChange={(e) => setFrequency(notes[e.target.value])}
                    className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {Object.keys(notes).map((note) => (
                        <option key={note} value={note}>
                            {note}
                        </option>
                    ))}
                </select>
            </div>

            {/* Waveform Control */}
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

            {/* Volume Control */}
            <div className="mb-6 w-full max-w-md">
                <label className="block text-lg font-medium text-white mb-2">
                    Volume: <span className="font-bold">{volume}</span>
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Duration Control */}
            <div className="mb-6 w-full max-w-md">
                <label className="block text-lg font-medium text-white mb-2">
                    Duration (ms): <span className="font-bold">{duration}</span>
                </label>
                <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Detune Control */}
            <div className="mb-6 w-full max-w-md">
                <label className="block text-lg font-medium text-white mb-2">
                    Detune (cents): <span className="font-bold">{detune}</span>
                </label>
                <input
                    type="range"
                    min="-1200"
                    max="1200"
                    step="10"
                    value={detune}
                    onChange={(e) => setDetune(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Play Button */}
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
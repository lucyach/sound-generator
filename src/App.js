"use client";

import React, { useState } from 'react';
import SoundGenerator from './components/SoundGenerator';
import BeatMapper from './components/BeatMapper';

function App() {
    const [sequence, setSequence] = useState([]);
    const [waveform, setWaveform] = useState('sine');
    const [volume, setVolume] = useState(0.5);
    const [detune, setDetune] = useState(0);
    const [frequency, setFrequency] = useState(440);
    const [duration, setDuration] = useState(500);

    const playSound = (frequency, duration) => {
        if (!isFinite(frequency) || !isFinite(duration)) {
            console.error('Invalid frequency or duration:', { frequency, duration });
            return;
        }

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.detune.setValueAtTime(detune, audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, duration);
    };

    const playSequence = () => {
        let currentTime = 0;
        sequence.forEach(({ frequency, duration }) => {
            setTimeout(() => playSound(frequency, duration), currentTime);
            currentTime += duration;
        });
    };

    const addNoteToSequence = () => {
        setSequence([...sequence, { frequency, duration }]);
    };

    const updateNote = (index, field, value) => {
        const updatedSequence = [...sequence];
        updatedSequence[index][field] = value;
        setSequence(updatedSequence);
    };

    const clearSequence = () => {
        setSequence([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-row p-6">
        <script src="https://cdn.tailwindcss.com"></script>

            <SoundGenerator
                frequency={frequency}
                setFrequency={setFrequency}
                volume={volume}
                setVolume={setVolume}
                duration={duration}
                setDuration={setDuration}
                detune={detune}
                setDetune={setDetune}
                playSound={playSound}
                addNoteToSequence={addNoteToSequence}
            />
            <BeatMapper
                sequence={sequence}
                updateNote={updateNote}
                playSequence={playSequence}
                clearSequence={clearSequence}
            />
        </div>
    );
}

export default App;
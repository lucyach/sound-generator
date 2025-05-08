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
    const [attack, setAttack] = useState(0);
    const [release, setRelease] = useState(0);

    const playSound = (sound) => {
        const { frequency, duration, attack, release, waveform, volume, detune } = sound;

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

        const startTime = audioContext.currentTime;
        const endTime = startTime + duration / 1000;

        gainNode.gain.setValueAtTime(0, startTime); // Start at 0
        gainNode.gain.linearRampToValueAtTime(volume, startTime + attack / 1000); // Ramp up during attack
        gainNode.gain.setValueAtTime(volume, endTime - release / 1000); // Sustain
        gainNode.gain.linearRampToValueAtTime(0, endTime); // Ramp down during release

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(endTime);
    };

    const playSequence = () => {
        let currentTime = 0;
        sequence.forEach((sound) => {
            setTimeout(() => playSound(sound), currentTime);
            currentTime += sound.duration;
        });
    };

    const addNoteToSequence = () => {
        const newSound = {
            frequency,
            duration,
            attack,
            release,
            waveform,
            volume,
            detune,
        };
        setSequence([...sequence, newSound]);
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
        <div className="min-h-screen flex flex-row p-6 gap-6 font-mono"
        style={{ backgroundColor: '#372142' }} // Replace with your desired hex color
        >
            <SoundGenerator
                frequency={frequency}
                setFrequency={setFrequency}
                volume={volume}
                setVolume={setVolume}
                duration={duration}
                setDuration={setDuration}
                detune={detune}
                setDetune={setDetune}
                attack={attack}
                setAttack={setAttack}
                release={release}
                setRelease={setRelease}
                waveform={waveform}
                setWaveform={setWaveform}
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
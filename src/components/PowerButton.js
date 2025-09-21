import React, { useEffect } from 'react';
import './PowerButton.css';

const PowerButton = ({ onActivate }) => {
  useEffect(() => {
    // Play electronic sound effect when component mounts
    const createElectronicSound = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const frequencies = [440, 554, 659, 880]; // A4, C#5, E5, A5

        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            playBeep(audioContext, freq, 0.1, 0.3);
          }, index * 150);
        });
      } catch (e) {
        console.log('Web Audio API not supported');
      }
    };

    const playBeep = (audioContext, frequency, duration, volume) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    // Auto-play sound after 1 second
    const timer = setTimeout(createElectronicSound, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    onActivate();
  };

  return (
    <div className="power-section">
      <div className="power-button-wrapper">
        <button className="power-button" onClick={handleClick}>
          <div className="power-icon">⚡</div>
        </button>
        <h1 className="team-name">CIM</h1>
        <p className="team-subtitle">Crazy Imba Movers</p>
      </div>
    </div>
  );
};

export default PowerButton;
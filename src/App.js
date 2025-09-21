import React, { useState, useEffect, useRef } from 'react';
import PowerButton from './components/PowerButton';
import Header from './components/Header';
import TeamGrid from './components/TeamGrid';
import ElectricFilter from './components/ElectricFilter';
import './App.css';

function App() {
  const [isActivated, setIsActivated] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const handleActivation = () => {
    setIsActivated(true);

    // Start music when activated
    if (audioRef.current) {
      try {
        audioRef.current.play();
      } catch (error) {
        console.log('Music playback failed:', error);
      }
    }
  };

  return (
    <div className="App">
      <ElectricFilter />

      {/* Background music audio element */}
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/background-music.webm" type="audio/webm" />
        Your browser does not support the audio element.
      </audio>

      <div className="container">
        {!isActivated ? (
          <PowerButton onActivate={handleActivation} />
        ) : (
          <div className="main-content">
            <Header />
            <TeamGrid />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
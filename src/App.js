import React, { useState, useEffect } from 'react';
import PowerButton from './components/PowerButton';
import Header from './components/Header';
import TeamGrid from './components/TeamGrid';
import ElectricFilter from './components/ElectricFilter';
import './App.css';

function App() {
  const [isActivated, setIsActivated] = useState(false);
  const [musicPlayer, setMusicPlayer] = useState(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Define onYouTubeIframeAPIReady globally
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'afcFRz81yTg',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          start: 0,
          end: 0
        },
        events: {
          onReady: (event) => {
            setMusicPlayer(event.target);
          }
        }
      });
    };

    return () => {
      if (window.YT && window.YT.loaded) {
        window.onYouTubeIframeAPIReady = null;
      }
    };
  }, []);

  const handleActivation = () => {
    setIsActivated(true);

    // Start music when activated
    if (musicPlayer) {
      musicPlayer.playVideo();
    }
  };

  return (
    <div className="App">
      <ElectricFilter />

      {/* Hidden YouTube player */}
      <div id="youtube-player" style={{ display: 'none' }}></div>

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
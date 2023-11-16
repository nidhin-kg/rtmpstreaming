import React, { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

const RTMPPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    let flvPlayer;

    const initializePlayer = () => {
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'rtmp://ec2-51-20-144-187.eu-north-1.compute.amazonaws.com/live/92Z8J-4WW32-3NXVQ',
      });

      if (audioRef.current) {
        flvPlayer.attachMediaElement(audioRef.current);
        flvPlayer.load();
        flvPlayer.play();
      }
    };

    const isUserInteracted = () => {
      const isTouchEvent = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      return isTouchEvent || document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || false;
    };

    if (isUserInteracted()) {
      initializePlayer();
    } else {
      const handleFirstInteraction = () => {
        initializePlayer();
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      if (flvPlayer) {
        flvPlayer.pause();
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
      }
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <audio ref={audioRef} className="w-75" controls></audio>
      </div>
    </div>
  );
};

export default RTMPPlayer;

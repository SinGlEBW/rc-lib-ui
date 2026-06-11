import React,{ useRef, useCallback, useState } from "react";


export function useAudio(url: string, options = { loop: false, volume: 0.7 }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [stateAudio, setState] = useState({ isPlaying: false, src: '' });
  

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      
      audioRef.current.loop = options.loop;
      audioRef.current.volume = options.volume;
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  }, [url, options.loop, options.volume]);

  const play = useCallback(async (src?: string) => {
    const audio = getAudio();
    try {
      if(src){
        audio.src = src;
      }
      const currentSrc = audio.getAttribute('src')!;
      setState((prev) => ({...prev, isPlaying: true, src: currentSrc }));
      await audio.play();

    } catch (error) {
      console.error("Play failed:", error);
      throw error;
    }
  }, [getAudio, setState]);

  const pause = useCallback(() => {
    const audio = getAudio();
    const currentSrc = audio.getAttribute('src')!;
    setState((prev) => ({...prev, isPlaying: false, src: currentSrc }));
    audio.pause();
  }, [getAudio]);

  const stop = useCallback(() => {
    const audio = getAudio();
    audio.pause();
    setState((prev) => ({...prev, isPlaying: false, src: audio.src }));
    audio.currentTime = 0;
  }, [getAudio]);

  const setVolume = useCallback((volume: number) => {
    const audio = getAudio();
    audio.volume = volume;
  }, [getAudio]);

  const mute = useCallback(() => {
    const audio = getAudio();
    audio.muted = true;
  }, [getAudio]);

  const unmute = useCallback(() => {
    const audio = getAudio();
    audio.muted = false;
  }, [getAudio]);

  return { play, pause, stop, setVolume, mute, unmute, getAudio, stateAudio };
}
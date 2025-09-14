import { create } from "zustand";
import { Howl, Howler } from 'howler';

interface AudioState {
  // Audio instances
  backgroundMusic: Howl | null;
  engineSound: Howl | null;
  interactionSound: Howl | null;
  
  // Settings
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  isInitialized: boolean;
  isMuted: boolean;
  
  // Actions
  initializeAudio: () => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playEngineSound: () => void;
  stopEngineSound: () => void;
  playInteractionSound: () => void;
  setMasterVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setSFXVolume: (volume: number) => void;
  toggleMute: () => void;
  cleanup: () => void;
  
  // Legacy compatibility
  playHit: () => void;
  playSuccess: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  // Initial state
  backgroundMusic: null,
  engineSound: null,
  interactionSound: null,
  masterVolume: 0.7,
  musicVolume: 0.4,
  sfxVolume: 0.6,
  isInitialized: false,
  isMuted: true, // Start muted by default

  initializeAudio: () => {
    try {
      const state = get();
      if (state.isInitialized) return;

      console.log('Initializing audio system...');

      // Create background music
      const backgroundMusic = new Howl({
        src: ['/sounds/background.mp3'],
        loop: true,
        volume: state.musicVolume * state.masterVolume,
        autoplay: false,
        preload: true
      });

      // Create interaction sound
      const interactionSound = new Howl({
        src: ['/sounds/success.mp3'],
        volume: state.sfxVolume * state.masterVolume,
        preload: true
      });

      // Create engine sound using hit.mp3 modified for engine effect
      const engineSound = new Howl({
        src: ['/sounds/hit.mp3'],
        loop: true,
        volume: state.sfxVolume * state.masterVolume * 0.3,
        rate: 0.7, // Lower pitch for engine-like sound
        autoplay: false,
        preload: true
      });

      set({
        backgroundMusic,
        engineSound,
        interactionSound,
        isInitialized: true
      });

      console.log('Audio system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  },

  playBackgroundMusic: () => {
    const { backgroundMusic, isInitialized, isMuted } = get();
    if (!isInitialized || isMuted || !backgroundMusic) return;

    try {
      if (!backgroundMusic.playing()) {
        backgroundMusic.play();
        console.log('Background music started');
      }
    } catch (error) {
      console.error('Failed to play background music:', error);
    }
  },

  stopBackgroundMusic: () => {
    const { backgroundMusic } = get();
    if (backgroundMusic && backgroundMusic.playing()) {
      backgroundMusic.stop();
      console.log('Background music stopped');
    }
  },

  playEngineSound: () => {
    const { engineSound, isInitialized, isMuted } = get();
    if (!isInitialized || isMuted || !engineSound) return;

    try {
      if (!engineSound.playing()) {
        engineSound.play();
      }
    } catch (error) {
      console.error('Failed to play engine sound:', error);
    }
  },

  stopEngineSound: () => {
    const { engineSound } = get();
    if (engineSound && engineSound.playing()) {
      engineSound.stop();
    }
  },

  playInteractionSound: () => {
    const { interactionSound, isInitialized, isMuted } = get();
    if (!isInitialized || isMuted || !interactionSound) return;

    try {
      // Stop current instance and play new one for overlapping sounds
      interactionSound.stop();
      interactionSound.play();
      console.log('Interaction sound played');
    } catch (error) {
      console.error('Failed to play interaction sound:', error);
    }
  },

  setMasterVolume: (volume) => {
    const state = get();
    Howler.volume(volume);
    
    // Update individual sound volumes
    if (state.backgroundMusic) {
      state.backgroundMusic.volume(state.musicVolume * volume);
    }
    if (state.engineSound) {
      state.engineSound.volume(state.sfxVolume * volume * 0.3);
    }
    if (state.interactionSound) {
      state.interactionSound.volume(state.sfxVolume * volume);
    }
    
    set({ masterVolume: volume });
  },

  setMusicVolume: (volume) => {
    const state = get();
    if (state.backgroundMusic) {
      state.backgroundMusic.volume(volume * state.masterVolume);
    }
    set({ musicVolume: volume });
  },

  setSFXVolume: (volume) => {
    const state = get();
    if (state.engineSound) {
      state.engineSound.volume(volume * state.masterVolume * 0.3);
    }
    if (state.interactionSound) {
      state.interactionSound.volume(volume * state.masterVolume);
    }
    set({ sfxVolume: volume });
  },

  toggleMute: () => {
    const state = get();
    const newMutedState = !state.isMuted;
    
    if (newMutedState) {
      // Mute all sounds
      state.stopBackgroundMusic();
      state.stopEngineSound();
    } else {
      // Unmute and potentially restart background music
      state.playBackgroundMusic();
    }
    
    set({ isMuted: newMutedState });
    console.log(`Audio ${newMutedState ? 'muted' : 'unmuted'}`);
  },

  cleanup: () => {
    const { backgroundMusic, engineSound, interactionSound } = get();
    
    if (backgroundMusic) {
      backgroundMusic.unload();
    }
    if (engineSound) {
      engineSound.unload();
    }
    if (interactionSound) {
      interactionSound.unload();
    }
    
    set({
      backgroundMusic: null,
      engineSound: null,
      interactionSound: null,
      isInitialized: false
    });
    
    console.log('Audio system cleaned up');
  },

  // Legacy compatibility
  playHit: () => {
    const { playEngineSound } = get();
    playEngineSound();
  },

  playSuccess: () => {
    const { playInteractionSound } = get();
    playInteractionSound();
  }
}));

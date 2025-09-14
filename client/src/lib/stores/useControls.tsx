import { create } from "zustand";

interface ControlsState {
  controls: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    interact: boolean;
  };
  
  // Actions
  setControls: (newControls: Partial<ControlsState['controls']> | ((prev: ControlsState['controls']) => ControlsState['controls'])) => void;
}

export const useControls = create<ControlsState>((set) => ({
  controls: {
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false
  },
  
  setControls: (newControls) => {
    set((state) => ({
      controls: typeof newControls === 'function' 
        ? newControls(state.controls)
        : { ...state.controls, ...newControls }
    }));
  }
}));

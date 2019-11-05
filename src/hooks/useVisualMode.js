import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState({current: initial, history: [initial]});
  

  const transition = (newMode, replace = false) => {
    
    return setMode(prev => {
      let modeOut = {};
    modeOut.current = newMode;
    if (replace) {
      modeOut.history = [...prev.history];
    } else {
      modeOut.history = [prev.current, ...prev.history];
    }
      return modeOut;
    });
  };
  const back = () => setMode(prev => ({current: prev.history[0], history: prev.history.slice(1)}));
  return {mode: mode.current, transition, back};
}
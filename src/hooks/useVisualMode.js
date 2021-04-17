import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    replace && setHistory(prev => [...prev.slice(0, -1), newMode]);
    !replace && setHistory(prev => [...prev, newMode]);
  }

  const back = () => {
      // const historyMutatable = history.slice();
      // historyMutatable.pop()
      //history[1] validates that there are at least two values in history, to prevent modifying initial state.
      // history[1] && setHistory(prev => [...prev.slice(0, -1)]);
      history[1] && setHistory(prev => prev.slice(0, -1));
    }

  const mode = history.slice(-1)[0];

  return {mode, transition, back};
}
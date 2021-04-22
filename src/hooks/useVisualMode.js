import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  //moves mode forward, current mode overwrite previous mode if replace is true
  const transition = (newMode, replace = false) => {
    replace && setHistory((prev) => [...prev.slice(0, -1), newMode]);
    !replace && setHistory((prev) => [...prev, newMode]);
  };

  //moves mode one backward, as long as history has at least two modes
  const back = () => {
    history[1] && setHistory((prev) => prev.slice(0, -1));
  };

  const mode = history.slice(-1)[0];

  return { mode, transition, back };
}

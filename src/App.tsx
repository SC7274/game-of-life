import React, { useCallback, useState, useEffect } from "react";
import { createEmptyGrid, getNextGeneration } from "./utils/gridUtils";
import Grid from "./components/Grid";

const App = () => {
  const [grid, setGrid] = useState(createEmptyGrid);
  const [running, setRunning] = useState(false);

  const runSimulation = useCallback(() => {
    setGrid((prevGrid) => getNextGeneration(prevGrid));
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(runSimulation, 250);
    return () => clearInterval(interval);
  }, [running, runSimulation]);

  return (
    <div>
      <button onClick={() => setRunning((prev) => !prev)}>
        {running ? "Stop" : "Start"}
      </button>
      <Grid grid={grid} setGrid={setGrid} />
    </div>
  );
};

export default App;

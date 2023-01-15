import React, { useCallback, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import produce from "immer";

import { FC, useState } from "react";

const numRows = 30;
const numCols = 30;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const App = () => {
  const initialGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), x => 0));
    }
    return rows;
  }
  const [grid, setGrid] = useState(initialGrid);

  const gridElements = [];
  for (let outerIndex = 0; outerIndex < numRows; outerIndex++) {
    let rows = grid[outerIndex];
    for (let innerIndex = 0; innerIndex < numCols; innerIndex++) {
      let col = rows[innerIndex];
      let key = `${outerIndex}-${innerIndex}`;
      gridElements.push(
        <div
          key={key}
          onClick={() => {
            const newGrid = produce(grid, gridCopy => {
              gridCopy[outerIndex][innerIndex] = (1 - grid[outerIndex][innerIndex]);
            });
            setGrid(newGrid);
          }}
          style={{
            width: 20,
            height: 20,
            backgroundColor: grid[outerIndex][innerIndex] == 1 ? "darkgray" : undefined,
            border: "solid 1px gray"
          }}
        >
        </div>
      )
    }
  }

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running);
  runningRef.current = running

  const gridRef = useRef(grid);
  gridRef.current = grid

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    const newGrid = produce(gridRef.current, gridCopy => {

      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {

          let neighbours = 0;
          operations.forEach(([x, y]) => {
            const newR = r + y;
            const newC = c + x;
            if (newR >= 0 && newR < numRows && newC >= 0 && newC < numCols) {
              neighbours += gridRef.current[newR][newC];
            }
          });
          if (neighbours < 2 || neighbours > 3) {
            gridCopy[r][c] = 0;
          } else if (grid[r][c] === 0 && neighbours === 3) {
            gridCopy[r][c] = 1;
          }
        }
      }
    });
    gridRef.current = newGrid;
    setGrid(newGrid);
    setTimeout(runSimulation, 250)
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation()
          }
        }}
      >
        {running ? 'stop' : "start"}

      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}>
        {gridElements}
      </div>
    </div>
  );
};

export default App;

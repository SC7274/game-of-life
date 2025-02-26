import React from "react";
import produce from "immer";
import Cell from "./Cell";

interface GridProps {
  grid: number[][];
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
}

const Grid: React.FC<GridProps> = ({ grid, setGrid }) => {
  const toggleCell = (r: number, c: number) => {
    setGrid((prevGrid) =>
      produce(prevGrid, (draft) => {
        draft[r][c] = prevGrid[r][c] ? 0 : 1;
      })
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,  // Use grid[0].length to determine columns
      }}
    >
      {grid.map((row, rIdx) =>
        row.map((col, cIdx) => (
          <Cell
            key={`${rIdx}-${cIdx}`}
            isActive={!!col}
            onClick={() => toggleCell(rIdx, cIdx)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;

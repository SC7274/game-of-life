export const numRows = 30;
export const numCols = 30;

export const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1], 
  [1, 1], [-1, -1], [1, 0], [-1, 0]
];

export const createEmptyGrid = () =>
  Array.from({ length: numRows }, () => Array(numCols).fill(0));

export const getNextGeneration = (grid: number[][]) => {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      const neighbors = operations.reduce((count, [x, y]) => {
        const newR = r + y;
        const newC = c + x;
        return count + (grid[newR]?.[newC] || 0);
      }, 0);

      if (neighbors < 2 || neighbors > 3) return 0;
      if (cell === 0 && neighbors === 3) return 1;
      return cell;
    })
  );
};

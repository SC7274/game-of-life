# Game of Life
This is a simple implementation of Conway's Game of Life, a cellular automaton simulation that simulates the life and death of cells on a grid.  
![]
(https://github.com/SC7274/game-of-life/blob/master/demo.gif)


## How to Play
The initial state of the colony is a grid of cells, where each cell can be either "alive" (light gray) or "dead" (no color).  
Press the "Start" button to begin the simulation. The colony will evolve according to a set of rules:  
-A live cell with fewer than two live neighbors will die (underpopulation)  
-A live cell with two or three live neighbors will survive  
-A live cell with more than three live neighbors will die (overcrowding)  
-A dead cell with exactly three live neighbors will come to life (reproduction)  
You can also click on individual cells to toggle them between alive and dead.  

## Technical details
This project was built using React and TypeScript.   
The state management library used is useState and useRef to keep track of the current state of the grid and whether the simulation is running or not.  
useCallback is used to prevent unnecessary re-rendering.  
The simulation is implemented using a setTimeout function that updates the grid state in regular intervals.  
The grid is rendered using a nested loop that creates a number of div elements, each representing a single cell.  
The produce function from the immer library is used to create a new grid state that is based on the previous state, allowing for immutability while still allowing for easy modifications.  

## To run the game
1. Clone the repository to your local machine  
2. Navigate to the project directory and run `npm install`  
3. Once the dependencies are installed, run `npm start`  
4. The game will open in your browser on http://localhost:3000/  

## Have fun!

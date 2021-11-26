import { generateMatrix } from './generateMatrix.js';

// main function
const bfs = (matrix) => {
  let startingRow;
  let startingCol;
  let endingRow;
  let endingCol;

  const getRandomCells = () => {
    startingRow = Math.floor(Math.random() * matrix.length);
    startingCol = Math.floor(Math.random() * matrix[startingRow].length);

    endingRow = Math.floor(Math.random() * matrix.length);
    endingCol = Math.floor(Math.random() * matrix[endingRow].length);

    if (
      // if value in some cell === 1
      matrix[startingRow][startingCol] !== 0 ||
      matrix[endingRow][endingCol] !== 0 ||
      // if randomed same cell
      (matrix[startingRow] === matrix[endingRow] &&
        matrix[startingCol] === matrix[endingCol])
    ) {
      getRandomCells();
    }
  };

  getRandomCells();

  let distance = 1;
  const queue = [[[startingRow, startingCol], distance]];
  const destination = [endingRow, endingCol];
  const visited = new Map();
  visited.set([startingRow, startingCol].toString(), null); // Mark initial points as visited

  const getNextSteps = ([startingRow, startingCol]) => {
    const directions = [
      // To top
      [-1, 0],
      // To right
      [0, 1],
      // To bottom
      [1, 0],
      // To left
      [0, -1],
    ];
    const nextSteps = [];
    for (const [nx, ny] of directions) {
      if (matrix[startingRow + nx]?.[startingCol + ny] === 0)
        nextSteps.push([startingRow + nx, startingCol + ny]);
    }
    return nextSteps;
  };

  const logPoints = () => {
    console.log(`Start point: (${startingRow}, ${startingCol})`);
    console.log(`End point: (${endingRow}, ${endingCol})`);
  };

  for (let [current, distance] of queue) {
    // Move the visited check to the loop
    if (
      current[0] === destination[0] &&
      current[1] === destination[1] &&
      matrix[destination[0]][destination[1]] === 0
    ) {
      // Derive the path from the linked list we now have in the visited structure:
      const path = [];
      while (current) {
        path.push(current);
        current = visited.get(current.toString());
      }
      logPoints();

      // RESULT - if reachable
      return path.reverse(); // Reverse to get from source to destination
    }

    for (let neighbor of getNextSteps(current)) {
      // Visited-check moved here:
      if (visited.has(neighbor.toString())) continue;
      // Mark with the coordinates of the previous node on the path:
      visited.set(neighbor.toString(), current);
      queue.push([neighbor, distance++]);
    }
  }
  logPoints();

  // RESULT - if unreachable
  return `Can't reach (${endingRow}, ${endingCol}) from (${startingRow}, ${startingCol})`;
};

// Execution
const matrix = generateMatrix(7, 7);
const result = bfs(matrix);
console.log('Matrix: ', matrix);
console.log('---------------------- Result ----------------------');
console.log(result);
console.log('----------------------------------------------------');

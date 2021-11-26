export const generateMatrix = (rows, cols) => {
  const outputArray = [];
  // Makes rows
  for (let row = 0; row < rows; row++) {
    outputArray[row] = [];
    // Makes cells
    for (let col = 0; col < cols; col++) {
      outputArray[row][col] = Math.floor(Math.random() * 2);
    }
  }
  return outputArray;
};

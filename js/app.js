const create2dArray = (rows, cols) => {
  const outputArray = [];
  for (let row = 0; row < rows; row++) {
    outputArray[row] = [];
    for (let col = 0; col < cols; col++) {
      outputArray[row][col] = Math.floor(Math.random() * 2);
    }
  }
  return outputArray;
};

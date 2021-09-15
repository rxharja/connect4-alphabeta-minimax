// 0 = yellow, 1 == red
let player = 0;

// minimax parameters
let humanPlayer = 0;
let aiPlayer = 1;
let maxDepth = 1;

// board parameters
const gridRows = 6;
const gridCols = 7;

let grid = Array.from({ length: gridCols }, () => 
  Array.from({ length: gridRows }, () => -1)
);

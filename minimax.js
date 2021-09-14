const aiMove = (grid) => {
  let bestMove = Math.floor(Math.random() * grid.length);
  let score = -Infinity;
  let bestScore = -Infinity;

  for (let i = 0; i < grid.length; i++) {
    let gridCopy = deepClone(grid);
    if (placeToken(aiPlayer, gridCopy, i)) {
      score = minimax(gridCopy, false, maxDepth, -Infinity, Infinity);
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

const minimax = (grid, maximizing, depth, alpha, beta) => {
  // node is a leaf, value of node is returned
  if (isWinState(aiPlayer, grid)) {
    return 10000 * depth;
  }
  else if (isWinState(humanPlayer, grid)) {
    return -10000 * depth;
  }
  else if (depth == 0) {
    return maximizing ? scorePosition(grid, aiPlayer) : -scorePosition(grid, humanPlayer);
  }
  else if (!hasMovesLeft(grid)) {
    return 0; 
  }

  if (maximizing) {
    for (let i = 0; i < grid.length; i++) {
      let gridCopy = deepClone(grid);
      if (placeToken(aiPlayer, gridCopy, i)) {
        alpha = Math.max( alpha, minimax(gridCopy, false, depth - 1, alpha, beta) );
        if (beta <= alpha) {
          return alpha;
        }
      }
    }
    return alpha;
  }
  else { // minimizing
    for(let i = 0; i < grid.length; i++) {
      let gridCopy = deepClone(grid);
      if (placeToken(humanPlayer, gridCopy, i)) {
        beta = Math.min( beta, minimax(deepClone(gridCopy), true, depth - 1, alpha, beta) );
        if (beta <= alpha) {
          return beta;
        }
      }
    }
    return beta;
  }
}

const hasMovesLeft = (grid) => {
  let moves = false;
  grid.forEach( col => {
    if (col.indexOf(-1) != -1) {
      moves = true;
    }
  })

  return moves;
}

const deepClone = (arr) => {
  var clone = [];
  for (i=0; i<arr.length; i++) {
    clone.push( arr[i].slice(0) )
  }
  return clone;
}

const scorePosition = (grid, piece) => {
  let score = 0;
  const center = grid[3];
  score += (center.filter( token => token == piece).length * 3);

  // score vertical
  grid.forEach( col => {
    count += evaluateWindow(col, piece);
  });

  // score horizontal
  for (let n = 0; n < grid.length; n++) {
    let row = grid.map(arr => arr[n]);
    score += evaluateWindow(row, piece);
  }

  [].concat(getDiagonal(grid, false), getDiagonal(grid, true))
    .filter( arr => arr.length >= 4)
    .forEach( diagonal => {
      count += evaluateWindow(diagonal, piece);
    });
  
  return score;
}

const evaluateWindow = (window, piece) => {
  let score = 0;
  oppPiece = humanPlayer;
  if (piece == humanPlayer) {
    oppPiece = aiPlayer;
  }

  if (window.filter( x => x == piece).length == 4) {
    score += 100;
  }
  else if (window.filter( x => x == piece).length == 3 && window.filter ( x => x == -1).length == 1) {
    score += 5;
  }
  else if (window.filter( x => x == piece).length == 2 && window.filter ( x => x == -1).length == 2) {
    score += 2;
  }
  else if (window.filter( x => x == oppPiece).length == 3 && window.filter ( x => x == -1).length == 1) {
    score -= 4;
  }

  return score;
}

const getValidCols = (grid) => {
  return grid .map( (col, i) => { if (col.indexOf(-1) != -1) return i } )
    .filter( x => x != undefined || x > grid.length );
}

const isWinState = (player, grid) => {
  let winStates = [false, false, false];
  winStates[0] = checkVerticalWinState(player, grid);
  winStates[1] = checkHorizontalWinState(player, grid);
  winStates[2] = checkDiagonalWinState(player, grid);

  return winStates.some(winState => winState);
}

const checkVerticalWinState = (player, grid) => {
  let maxCount = 0;

  grid.forEach( col => {
    count = countSequentialTokens(player, col);
    maxCount = count > maxCount ? count : maxCount;
  });

  return maxCount >= 4;
}

const checkHorizontalWinState = (player, grid) => {
  let maxCount = 0;

  for (let n = 0; n < grid.length; n++) {
    let row = grid.map(arr => arr[n]);
    count = countSequentialTokens(player, row);
    maxCount = count > maxCount ? count : maxCount;
  }

  return maxCount >= 4;
}

const checkDiagonalWinState = (player, grid) => {
  let maxCount = 0;

  [].concat(getDiagonal(grid, false), getDiagonal(grid, true))
    .filter( arr => arr.length >= 4)
    .forEach( diagonal => {
      count = countSequentialTokens(player, diagonal);
      maxCount = count > maxCount ? count : maxCount;
    });
  
  return maxCount >= 4;
}

const getDiagonal = (array, bottomToTop) => {
    var Ylength = array.length;
    var Xlength = array[0].length;
    var maxLength = Math.max(Xlength, Ylength);
    var temp;
    var returnArray = [];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - (bottomToTop ? Ylength - y : y);
            if (x >= 0 && x < Xlength) {
                temp.push(array[y][x]);
            }
        }
        if(temp.length > 0) {
            returnArray.push(temp);
        }
    }
    return returnArray;
}

const countSequentialTokens = (player, tokenList) => {
  let count = 0;
  let highscore = 0;

  tokenList.forEach(pos => {
    if (player == pos) {
      count = count + 1;
      highscore = count > highscore ? count : highscore;
    }
    else {
      count = 0;
    }
  })

  return highscore;
}


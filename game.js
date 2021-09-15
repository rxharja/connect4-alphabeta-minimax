const runGame = (col) => {
  maxDepth = Number(document.getElementById("difficulty").value);

  console.log(maxDepth);
  if ( checkWinState(humanPlayer, grid) || checkWinState(aiPlayer, grid) ) {
    removeEventListeners();
  }
  else {
    const isValidTurn = placeToken(player, grid, col);

    if (isValidTurn) {
      player = player == 0 ? 1 : 0;

      if (player == aiPlayer) {
        opponentMove();
      }
    }

    rerenderBoard();
  }
}

const opponentMove = () => {
  let move = aiMove(grid);
  placeToken(player, grid, move);
  checkWinState(player, grid);
  player = player == 0 ? 1 : 0;
}

const clearBoard = () => {
  grid = Array.from({ length: gridCols }, () => 
    Array.from({ length: gridRows }, () => -1)
  );

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let col = document.querySelector(`.col-${i} > .slot-${j}`)
      col.innerHTML = "";
    }  
  }

  rerenderBoard();
}

const rerenderBoard = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let col = document.querySelector(`.col-${i} > .slot-${j}`)

      let player = grid[i][j] == -1 ? "" : 
        grid[i][j] == 0 ? "player-1" : "player-2";

      col.innerHTML = `<div class="${player} token"></div>`;
    }  
  }
}

const checkWinState = (player, grid) => {
  if (isWinState(player, grid)) {
    console.log("Congratulations! you won!")
    // clearBoard();
    document.querySelector(".win-message").textContent = `${player == 0 ? "You" : "Computer"} won!`;
    return true;
  }
  return false;
}

document.querySelector(".clear").addEventListener("click", () => clearBoard());

const cols = document.querySelectorAll(".col");

const removeEventListeners = () => {
  const btn = document.querySelector(".clear")
  btn.replaceWith(btn.cloneNode(true));
  cols.forEach( col => col.replaceWith(col.cloneNode(true)));
}

cols.forEach(( col, i ) => col.addEventListener("click", () => runGame(i)));


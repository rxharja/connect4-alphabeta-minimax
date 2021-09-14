const findValidPlace = (column) => {
  return column.lastIndexOf(-1);
}

const placeToken = (player, grid, col) => {
  const location = findValidPlace(grid[col]);

  if (location == -1) {
    return false;
  }

  grid[col][location] = player;

  return true;
}

export default function (field, currentCoord) {
  var currentCellValue = field[ currentCoord.row ][ currentCoord.col ],
      currentCoordCopy = { row: currentCoord.row, col: currentCoord.col },
      result           = isNotShip(currentCellValue) ? [] : [ currentCoordCopy ],
      leftCells        = elements(field, currentCoord, 0, -1),
      rightCells       = elements(field, currentCoord, 0, 1),
      topCells         = elements(field, currentCoord, -1, 0),
      bottomCells      = elements(field, currentCoord, 1, 0);

  result = leftCells.concat(topCells).concat(result);
  result = result.concat(rightCells).concat(bottomCells);

  return result;
}

function elements (field, baseCoord, rowIncrement, colIncrement) {
  var result     = [],
      func       = rowIncrement > 0 || colIncrement > 0 ? 'push' : 'unshift',
      currentRow = baseCoord.row,
      currentCol = baseCoord.col;

  while (true) {
    currentRow += rowIncrement;
    currentCol += colIncrement;

    if (outOfField(currentRow, currentCol)) break;
    if (isNotShip(field[ currentRow ][ currentCol ])) break;

    result[ func ]({ row: currentRow, col: currentCol });
  }

  return result;
}

function isNotShip (value) {
  return value !== 's' && value !== 'w';
}

function outOfField (row, col) {
  var outOfRow = row < 0 || row > 9,
      outOfCol = col < 0 || col > 9;

  return outOfRow || outOfCol;
}

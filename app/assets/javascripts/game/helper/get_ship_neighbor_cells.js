import getShipCells from './get_ship_cells.js';

export default function (field, currentCoord) {
  var shipCells = getShipCells(field, currentCoord);

  var result = shipCells.map((cell) => getNeighborEmptyCells(field, cell))
    .reduce((result, emptyCells) => result.concat(emptyCells), []);

  result.sort(coordComparator);
  return distinct(result);
}

function getNeighborEmptyCells (field, cell) {
  var result = [];

  for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
    for (let colOffset = -1; colOffset < 2; colOffset++) {
      let rowIndex = cell.row + rowOffset,
          colIndex = cell.col + colOffset;

      if (colOffset === 0 && rowOffset === 0) continue;
      if (outOfField(rowIndex, colIndex)) continue;

      if (isNotShip(field[ rowIndex ][ colIndex ])) {
        result.push({ row: rowIndex, col: colIndex });
      }
    }
  }

  return result;
}

function coordComparator (c1, c2) {
  var rowDiff = c1.row - c2.row;

  return rowDiff !== 0 ? rowDiff : c1.col - c2.col;
}

function distinct (coords) {
  var result = [],
      prevElem;

  for (let i = 0; i < coords.length; i++) {
    let coord = coords[ i ];

    if (prevElem && prevElem.row === coord.row && prevElem.col === coord.col) continue;

    result.push(coord);
    prevElem = coord;
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

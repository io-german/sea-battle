import getShipNeighborCells from '../helper/get_ship_neighbor_cells.js';
import getShipCells from '../helper/get_ship_cells.js';
import { model as masterModel } from '../model.js';

export default class {
  constructor (view) {
    masterModel.currentStep = 'rival_move';
    this.view = view;
    view(masterModel.ownField, masterModel.rivalField);
  }

  rivalShot (coord) {
    var field = masterModel.ownField,
        cellValue = field[ coord.row ][ coord.col ],
        result    = 'm';

    if (cellValue === 's') {
      field[ coord.row ][ coord.col ] = 'w';
      result = 'w';

      let cells      = getShipCells(field, coord),
          shipKilled = cells.reduce((prev, curr) => prev && field[ curr.row ][ curr.col ] === 'w', true);

      if (shipKilled) {
        let neighborCells = getShipNeighborCells(field, coord);

        neighborCells.forEach((cell) => field[ cell.row ][ cell.col ] = 'm');
        result = 'k';
      }
    } else {
      field[ coord.row ][ coord.col ] = 'm';
    }

    this.view(masterModel.ownField, masterModel.rivalField);
    return result;
  }

  ownShot (coord, result) {
    var field = masterModel.rivalField;

    field[ coord.row ][ coord.col ] = result === 'k' ? 'w' : result;
    if (result === 'k') {
      let neighborCells = getShipNeighborCells(field, coord);

      neighborCells.forEach((cell) => field[ cell.row ][ cell.col ] = 'm');
    }
    this.view(masterModel.ownField, masterModel.rivalField);
  }
}

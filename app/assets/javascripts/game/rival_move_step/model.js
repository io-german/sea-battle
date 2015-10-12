import getShipNeighborCells from '../helper/get_ship_neighbor_cells.js';
import getShipCells from '../helper/get_ship_cells.js';
import { model as masterModel } from '../model.js';

export default class {
  constructor (view) {
    masterModel.currentStep = 'rival_move';
    this.view = view;
    this.field = masterModel.ownField;
    view(this.field, masterModel.rivalField);
  }

  rivalShot (coord) {
    var cellValue = this.field[ coord.row ][ coord.col ],
        result    = 'm';

    if (cellValue === 's') {
      this.field[ coord.row ][ coord.col ] = 'w';
      result = 'w';

      let cells      = getShipCells(this.field, coord),
          shipKilled = cells.reduce((prev, curr) => prev && this.field[ curr.row ][ curr.col ] === 'w', true);

      if (shipKilled) {
        let neighborCells = getShipNeighborCells(this.field, coord);

        neighborCells.forEach((cell) => this.field[ cell.row ][ cell.col ] = 'm');
        result = 'k';
      }
    } else {
      this.field[ coord.row ][ coord.col ] = 'm';
    }

    this.view(this.field, masterModel.rivalField);
    return result;
  }
}

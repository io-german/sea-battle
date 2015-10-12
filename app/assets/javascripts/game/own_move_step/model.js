import getShipNeighborCells from '../helper/get_ship_neighbor_cells.js';
import { model as masterModel } from '../model.js';

export default class {
  constructor (view) {
    masterModel.currentStep = 'own_move';
    this.view = view;
    this.field = masterModel.rivalField;
    view(masterModel.ownField, this.field);
  }

  ownShot (coord, result) {
    var field = this.rival;

    field[ coord.row ][ coord.col ] = result === 'k' ? 'w' : result;
    if (result === 'k') {
      let neighborCells = getShipNeighborCells(field, coord);

      neighborCells.forEach((cell) => field[ cell.row ][ cell.col ] = 'm');
    }
    this.view(masterModel.ownField, this.field);
  }
}

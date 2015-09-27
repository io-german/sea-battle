import createField from '../helper/create_field.js';
import getShipCells from './get_ship_cells.js';
import getShipNeighborCells from './get_ship_neighbor_cells.js';

export default class {
  constructor (view, own, rival) {
    rival = rival || createField();

    this.own = own;
    this.rival = rival;
    this.view = view;

    this.view(this);
  }

  rivalShot (coord) {
    var field = this.own,
        cellValue = field[ coord.row ][ coord.col ],
        result = 'm';

    if (cellValue === 's') {
      field[ coord.row ][ coord.col ] = 'w';
      result = 'w';

      let cells = getShipCells(field, coord),
          shipKilled = cells.reduce((prev, curr) => prev && field[ curr.row ][ curr.col ] === 'w', true);

      if (shipKilled) {
        let neighborCells = getShipNeighborCells(field, coord);

        neighborCells.forEach((cell) => field[ cell.row ][ cell.col ] = 'm');
        result = 'k';
      }
    } else {
      field[ coord.row ][ coord.col ] = 'm';
    }

    this.view(this);
    return result;
  }

  ownShot (coord, result) {
    var field = this.rival;

    field[ coord.row ][ coord.col ] = result === 'k' ? 'w' : result;
    if (result === 'k') {
      let neighborCells = getShipNeighborCells(field, coord);

      neighborCells.forEach((cell) => field[ cell.row ][ cell.col ] = 'm');
    }
    this.view(this);
  }
}

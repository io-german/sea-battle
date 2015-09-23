import create_field from '../helper/create_field.js';
import ShipPosition from './ShipPosition.js';

var ships = [ 1, 1, 1, 1, 2, 2, 2, 3, 3, 4 ];

export default class {
  constructor (view) {
    this.view = view;
    this.field = create_field();
    this.current_ship = 0;

    this.view(this);
  }

  move (direction) {
    this.current_position = this.current_position.move(direction);
    this.view(this);
  }

  rotate () {
    this.current_position = this.current_position.rotate();
    this.view(this);
  }

  place () {
    if (this.valid) {
      let coords = this.current_position.coords;

      for (let i = 0; i < coords.length; i++) {
        let cell = coords[i];

        this.field[cell.row][cell.col] = 's';
      }

      this.current_ship += 1;
      this.view(this);
    }
  }

  set current_ship (value) {
    this._current_ship = value;
    this.current_position = this.init_ship(value);
  }

  get current_ship () {
    return this._current_ship;
  }

  init_ship (current_ship) {
    var hull_size  = ships[ current_ship ],
        base_coord = { row: 0, col: 0 };

    return new ShipPosition(base_coord, 'row', hull_size);
  }

  get valid () {
    var coords = this.current_position.coords;

    for (let i = 0; i < coords.length; i++) {
      if (not_valid_cell(coords[ i ], this.field)) return false;
    }
    return true;
  }
}

function not_valid_cell (cell, field) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      var row = cell.row + i,
          col = cell.col + j;

      if (row >= 0 && row < 10 && col >= 0 && col < 10 && field[row][col] === 's') return true;
    }
  }
  return false;
}

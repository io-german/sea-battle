import createField from '../../game_field/helper/create_field.js';
import { model as masterModel } from '../model.js';
import { pubsub } from '../../util/pubsub.js';
import ShipPosition from './ShipPosition.js';

var ships = [ 1, 1, 1, 1, 2, 2, 2, 3, 3, 4 ];

export default class {
  constructor (view) {
    masterModel.currentStep = 'arrangement';

    this.view = view;
    this.field = createField();
    this.currentShip = 0;

    this.view(this);
  }

  move (direction) {
    this.currentPosition = this.currentPosition.move(direction);
    this.view(this);
  }

  rotate () {
    this.currentPosition = this.currentPosition.rotate();
    this.view(this);
  }

  place () {
    if (this.valid) {
      let coords = this.currentPosition.coords;

      for (let i = 0; i < coords.length; i++) {
        let cell = coords[i];

        this.field[cell.row][cell.col] = 's';
      }

      if (++this.currentShip > 9) {
        pubsub.publish('arrangement.finished', this.field);
      }
      this.view(this);
    }
  }

  set currentShip (value) {
    this.currentShipIndex = value;
    this.currentPosition = this.initShip(value);
  }

  get currentShip () {
    return this.currentShipIndex;
  }

  initShip (currentShip) {
    var hullSize  = ships[ currentShip ],
        baseCoord = { row: 0, col: 0 };

    return new ShipPosition(baseCoord, 'row', hullSize);
  }

  get valid () {
    var coords = this.currentPosition.coords;

    for (let i = 0; i < coords.length; i++) {
      if (notValidCell(coords[ i ], this.field)) return false;
    }
    return true;
  }
}

function notValidCell (cell, field) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      var row = cell.row + i,
          col = cell.col + j;

      if (row >= 0 && row < 10 && col >= 0 && col < 10 && field[row][col] === 's') return true;
    }
  }
  return false;
}

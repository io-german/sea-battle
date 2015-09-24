import createField from '../helper/create_field.js';

export default class {
  constructor (view, own, rival) {
    rival = rival || createField();

    this.own = own;
    this.rival = rival;
    this.view = view;

    this.view(this);
  }

  shot (fieldName, coord, result) {
    var field = this[fieldName];

    field[coord.row][coord.col] = result;
    this.view(this);
  }
}

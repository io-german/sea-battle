export default class {
  constructor (view) {
    this.view = view;

    this.field = [];
    for (var i = 0; i < 10; i++) {
      this.field.push([]);
    }
  }

  update_cell (row, column, value) {
    this.field[row][column] = value;
    this.view.draw(this.field);
  }
}

export default class ShipPosition {
  constructor (base_coord, rotation, hull_size) {
    this.base_coord = base_coord;
    this.rotation = rotation;
    this.hull_size = hull_size;
    this.coords = [];

    for (let i = 0; i < hull_size; i++) {
      let row_increment = rotation === 'row' ? 0 : i,
          col_increment = rotation === 'col' ? i : 0;

      this.coords.push({
        row: base_coord.row + row_increment,
        col: base_coord.col + col_increment
      });
    }
  }

  rotate () {
    var new_rotation = this.rotation === 'row' ? 'col' : 'row';

    return new ShipPosition(this.base_coord, new_rotation, this.hull_size);
  }

  move (direction) {
    var row_increment  = direction === 'up' ? -1 : ( direction === 'down' ? 1 : 0 ),
        col_increment  = direction === 'left' ? -1 : ( direction === 'right' ? 1 : 0 ),
        new_base_coord = {
          row: this.base_coord.row + row_increment,
          col: this.base_coord.col + col_increment
        },
        new_position = new ShipPosition(new_base_coord, this.rotation, this.hull_size);

    return new_position.within_field() ? new_position : this;
  }

  within_field () {
    var first = this.coords[0],
        last = this.coords[this.coords.length - 1],
        left = first.col,
        top = first.row,
        right = last.col,
        bottom = last.row;

    return left >= 0 && top >= 0 && right < 10 && bottom < 10;
  }
}

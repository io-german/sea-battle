export default class ShipPosition {
  constructor (baseCoord, rotation, hullSize) {
    this.baseCoord = baseCoord;
    this.rotation = rotation;
    this.hullSize = hullSize;
    this.coords = [];

    for (let i = 0; i < hullSize; i++) {
      let rowIncrement = rotation === 'row' ? 0 : i,
          colIncrement = rotation === 'col' ? 0 : i;

      this.coords.push({
        row: baseCoord.row + rowIncrement,
        col: baseCoord.col + colIncrement
      });
    }
  }

  rotate () {
    var newRotation = this.rotation === 'row' ? 'col' : 'row',
        newPosition = new ShipPosition(this.baseCoord, newRotation, this.hullSize);

    return newPosition.withinField() ? newPosition : this;
  }

  move (direction) {
    var rowIncrement  = direction === 'up' ? -1 : (direction === 'down' ? 1 : 0),
        colIncrement  = direction === 'left' ? -1 : (direction === 'right' ? 1 : 0),
        baseRow = this.baseCoord.row + rowIncrement,
        baseCol = this.baseCoord.col + colIncrement,
        newBaseCoord = { row: baseRow, col: baseCol },
        newPosition   = new ShipPosition(newBaseCoord, this.rotation, this.hullSize);

    return newPosition.withinField() ? newPosition : this;
  }

  withinField () {
    var first  = this.coords[ 0 ],
        last   = this.coords[ this.coords.length - 1 ],
        left   = first.col,
        top    = first.row,
        right  = last.col,
        bottom = last.row;

    return left >= 0 && top >= 0 && right < 10 && bottom < 10;
  }
}

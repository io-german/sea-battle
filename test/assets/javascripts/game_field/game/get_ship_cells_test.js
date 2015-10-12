import getShipCells from '../../../../../app/assets/javascripts/game/helper/get_ship_cells.js';
import createField from '../../../../../app/assets/javascripts/game/helper/create_field.js';
import '../../chai_initializer.js';

describe('getShipCells function', function () {
  var field;

  beforeEach(function () {
    field = createField();
  });

  it('should return empty array if currentCoord is not a ship cell', function () {
    getShipCells(field, { row: 0, col: 0 }).should.be.empty;
  });

  it('should return single-element array if currentCoord points to hull size 1 ship', function () {
    field[ 0 ][ 0 ] = 's';

    var ship = getShipCells(field, { row: 0, col: 0 });

    ship.should.have.length(1);
    ship.should.be.deep.equal([ { row: 0, col: 0 } ]);
  });

  it('should return 4-element array if currentCoord points a row-oriented hull size 4 ship in the upper-left corner', function () {
    field[ 0 ][ 0 ] = field[ 0 ][ 1 ] = field[ 0 ][ 2 ] = field[ 0 ][ 3 ] = 's';

    var ship = getShipCells(field, { row: 0, col: 1 });

    ship.should.have.length(4);
    ship.should.be.deep.equal([ { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 } ]);
  });

  it('should return 4-element array if currentCoord points a col-oriented hull size 4 ship in the upper-left corner', function () {
    field[ 0 ][ 0 ] = field[ 1 ][ 0 ] = field[ 2 ][ 0 ] = field[ 3 ][ 0 ] = 's';

    var ship = getShipCells(field, { row: 1, col: 0 });

    ship.should.have.length(4);
    ship.should.be.deep.equal([ { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }, { row: 3, col: 0 } ]);
  });

  it('should return 4-element array if currentCoord points a row-oriented hull size 4 ship in the lower-right corner', function () {
    field[ 9 ][ 9 ] = field[ 9 ][ 8 ] = field[ 9 ][ 7 ] = field[ 9 ][ 6 ] = 's';

    var ship = getShipCells(field, { row: 9, col: 7 });

    ship.should.have.length(4);
    ship.should.be.deep.equal([ { row: 9, col: 6 }, { row: 9, col: 7 }, { row: 9, col: 8 }, { row: 9, col: 9 } ]);
  });

  it('should return 4-element array if currentCoord points a col-oriented hull size 4 ship in the lower-right corner', function () {
    field[ 9 ][ 9 ] = field[ 8 ][ 9 ] = field[ 7 ][ 9 ] = field[ 6 ][ 9 ] = 's';

    var ship = getShipCells(field, { row: 7, col: 9 });

    ship.should.have.length(4);
    ship.should.be.deep.equal([ { row: 6, col: 9 }, { row: 7, col: 9 }, { row: 8, col: 9 }, { row: 9, col: 9 } ]);
  });

  it('should return 4-element array if currentCoord points a row-oriented hull size 4 ship in the mid-field', function () {
    field[ 3 ][ 3 ] = field[ 3 ][ 4 ] = field[ 3 ][ 5 ] = field[ 3 ][ 6 ] = 's';

    var ship = getShipCells(field, { row: 3, col: 4 });

    ship.should.have.length(4);
    ship.should.be.deep.equal([ { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 }, { row: 3, col: 6 } ]);
  });

  it('should return 4-element array if currentCoord points a col-oriented hull size 4 ship in the mid-field', function () {
    field[ 3 ][ 3 ] = field[ 4 ][ 3 ] = field[ 5 ][ 3 ] = field[ 6 ][ 3 ] = 's';

    var ship = getShipCells(field, { row: 4, col: 3 });

    ship.should.have.length(4);
    ship.should.be.deep.equal([ { row: 3, col: 3 }, { row: 4, col: 3 }, { row: 5, col: 3 }, { row: 6, col: 3 } ]);
  });
});

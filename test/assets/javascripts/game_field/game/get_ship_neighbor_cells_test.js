import '../../chai_initializer.js';
import getShipNeighborCells from '../../../../../app/assets/javascripts/game/helper/get_ship_neighbor_cells.js';
import createField from '../../../../../app/assets/javascripts/game/helper/create_field.js';

describe('getShipNeighborCells function', function () {
  var field;

  beforeEach(function () {
    field = createField();
  });

  it('should return empty array if currentCoord does not point a ship', function () {
    var neighbors = getShipNeighborCells(field, { row: 0, col: 0 });

    neighbors.should.be.empty;
  });

  it('should return 3 neighbors if currentCoord points a hull size 1 ship in upper-left corner', function () {
    field[ 0 ][ 0 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 0, col: 0 });

    neighbors.should.have.length(3);
    neighbors.should.be.deep.equal([ { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 } ]);
  });

  it('should return 3 neighbors if currentCoord points a hull size 1 ship in the lower-right corner', function () {
    field[ 9 ][ 9 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 9, col: 9 });

    neighbors.should.have.length(3);
    neighbors.should.be.deep.equal([ { row: 8, col: 8 }, { row: 8, col: 9 }, { row: 9, col: 8 } ]);
  });

  it('should return 8 neighbors if currentCoord points a hull size 1 ship in the mid-field', function () {
    field[ 5 ][ 5 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 5, col: 5 });

    neighbors.should.have.length(8);
    neighbors.should.be.deep.equal([
      { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 4, col: 6 },
      { row: 5, col: 4 }, { row: 5, col: 6 },
      { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 }
    ]);
  });

  it('should return 6 neighbors if currentCoord points a row-oriented hull size 4 ship in the upper-left corner', function () {
    field[ 0 ][ 0 ] = field[ 0 ][ 1 ] = field[ 0 ][ 2 ] = field[ 0 ][ 3 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 0, col: 2 });

    neighbors.should.have.length(6);
    neighbors.should.be.deep.equal([
      { row: 0, col: 4 },
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }
    ])
  });

  it('should return 6 neighbors if currentCoord points a col-oriented hull size 4 ship in the upper-left corner', function () {
    field[ 0 ][ 0 ] = field[ 1 ][ 0 ] = field[ 2 ][ 0 ] = field[ 3 ][ 0 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 2, col: 0 });

    neighbors.should.have.length(6);
    neighbors.should.be.deep.equal([
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
      { row: 3, col: 1 },
      { row: 4, col: 0 }, { row: 4, col: 1 }
    ])
  });

  it('should return 6 neighbors if currentCoord points a row-oriented hull size 4 ship in the lower-right corner', function () {
    field[ 9 ][ 6 ] = field[ 9 ][ 7 ] = field[ 9 ][ 8 ] = field[ 9 ][ 9 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 9, col: 7 });

    neighbors.should.have.length(6);
    neighbors.should.be.deep.equal([
      { row: 8, col: 5 }, { row: 8, col: 6 }, { row: 8, col: 7 }, { row: 8, col: 8 }, { row: 8, col: 9 },
      { row: 9, col: 5 }
    ]);
  });

  it('should return 6 neighbors if currentCoord points a col-oriented hull size 4 ship in the lower-right corner', function () {
    field[ 6 ][ 9 ] = field[ 7 ][ 9 ] = field[ 8 ][ 9 ] = field[ 9 ][ 9 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 7, col: 9 });

    neighbors.should.have.length(6);
    neighbors.should.be.deep.equal([
      { row: 5, col: 8 }, { row: 5, col: 9 },
      { row: 6, col: 8 },
      { row: 7, col: 8 },
      { row: 8, col: 8 },
      { row: 9, col: 8 }
    ]);
  });

  it('should return 14 neighbors if currentCoord points a hull size 4 ship in the mid-field', function () {
    field[ 3 ][ 3 ] = field[ 4 ][ 3 ] = field[ 5 ][ 3 ] = field[ 6 ][ 3 ] = 's';

    var neighbors = getShipNeighborCells(field, { row: 3, col: 5 });

    neighbors.should.have.length(14);
    neighbors.be.deep.equal([
      { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 },
      { row: 3, col: 2 }, { row: 3, col: 4 },
      { row: 4, col: 2 }, { row: 4, col: 4 },
      { row: 5, col: 2 }, { row: 5, col: 4 },
      { row: 6, col: 2 }, { row: 6, col: 4 },
      { row: 7, col: 2 }, { row: 7, col: 6 }, { row: 7, col: 4 }
    ]);
  })
});

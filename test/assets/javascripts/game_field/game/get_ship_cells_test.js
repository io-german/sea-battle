import getShipCells from '../../../../../app/assets/javascripts/game_field/game/get_ship_cells.js';
import createField from '../../../../../app/assets/javascripts/game_field/helper/create_field.js';
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
    field[0][0] = 's';

    getShipCells(field, { row: 0, col: 0 }).should.have.length(1);
  });

});

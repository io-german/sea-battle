import '../../chai_initializer.js';
import ShipPosition from '../../../../../app/assets/javascripts/game_field/arrangement/ShipPosition.js';

describe('ShipPosition', function () {

  var initial_position   = { row: 0, col: 0 },
      mid_field_position = { row: 5, col: 5 };

  describe('constructor', function () {
    it('should generate 1 coords for hull size 1 ship', function () {
      var ship = new ShipPosition(initial_position, 'row', 1);

      ship.coords.length.should.equal(1);
      ship.coords[ 0 ].should.be.deep.equal({ row: 0, col: 0 });
    });

    it('should generate 2 coords for hull size 2 ship', function () {
      var ship = new ShipPosition(initial_position, 'row', 2);

      ship.coords.length.should.equal(2);
      ship.coords[ 0 ].should.be.deep.equal({ row: 0, col: 0 });
      ship.coords[ 1 ].should.be.deep.equal({ row: 0, col: 1 });
    });

    it('should generate 4 coords for hull size 4 ship', function () {
      var ship = new ShipPosition(initial_position, 'row', 4);

      ship.coords.length.should.equal(4);
      ship.coords[ 0 ].should.be.deep.equal({ row: 0, col: 0 });
      ship.coords[ 1 ].should.be.deep.equal({ row: 0, col: 1 });
      ship.coords[ 2 ].should.be.deep.equal({ row: 0, col: 2 });
      ship.coords[ 3 ].should.be.deep.equal({ row: 0, col: 3 });
    });

    it('should generate correct coords if initial position have other value', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 4);

      ship.coords.length.should.equal(4);
      ship.coords[ 0 ].should.be.deep.equal({ row: 5, col: 5 });
      ship.coords[ 1 ].should.be.deep.equal({ row: 5, col: 6 });
      ship.coords[ 2 ].should.be.deep.equal({ row: 5, col: 7 });
      ship.coords[ 3 ].should.be.deep.equal({ row: 5, col: 8 });
    });

    it('should generate coorect coords if "col" rotation is enabled', function () {
      var ship = new ShipPosition(initial_position, 'col', 2);

      ship.coords.length.should.equal(2);
      ship.coords[ 0 ].should.be.deep.equal({ row: 0, col: 0 });
      ship.coords[ 1 ].should.be.deep.equal({ row: 1, col: 0 });
    });
  });

  describe('rotate method', function () {
    it('should change rotation from "row" to "col"', function () {
      var ship = new ShipPosition(initial_position, 'row', 2).rotate();

      ship.rotation.should.equal('col');
    });

    it('should change rotation from "col" to "row"', function () {
      var ship = new ShipPosition(initial_position, 'col', 2).rotate();

      ship.rotation.should.equal('row');
    });

    it('should return ship to initial rotation if double-called', function () {
      var ship = new ShipPosition(initial_position, 'row', 2).rotate().rotate();

      ship.rotation.should.equal('row');
    });
  });

  describe('move method', function () {
    it('should change base_coord if direction is "up"', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 2).move('up');

      ship.base_coord.should.be.deep.equal({ row: 4, col: 5 });
    });

    it('should change base_coord if direction is "right"', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 2).move('right');

      ship.base_coord.should.be.deep.equal({ row: 5, col: 6 });
    });

    it('should change base_coord if direction is "down"', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 2).move('down');

      ship.base_coord.should.be.deep.equal({ row: 6, col: 5 });
    });

    it('should change base_coord if direction is "left"', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 2).move('left');

      ship.base_coord.should.be.deep.equal({ row: 5, col: 4 });
    });

    it('should not change base_coord if direction has unexpected value', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 2).move('unexpected');

      ship.base_coord.should.be.deep.equal({ row: 5, col: 5 });
    });
  });

  describe('within_field method', function () {
    it('should return true if hull size 1 ship is within field', function () {
      var ship = new ShipPosition(mid_field_position, 'row', 1);

      ship.within_field().should.be.true;
    });

    it('should return false if hull size 1 ship is outside left border of field', function () {
      var ship = new ShipPosition({ row: 0, col: -1 }, 'row', 1);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 1 ship is outside top border of field', function () {
      var ship = new ShipPosition({ row: -1, col: 0 }, 'row', 1);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 1 ship is outside right border of field', function () {
      var ship = new ShipPosition({ row: 0, col: 10 }, 'row', 1);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 1 ship is outside bottom border of field', function () {
      var ship = new ShipPosition({ row: 10, col: 0 }, 'row', 1);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 4 ship is partially within field (left border overflow)', function () {
      var ship = new ShipPosition({ row: 0, col: -1 }, 'row', 4);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 4 ship is partially within field (top border overflow)', function () {
      var ship = new ShipPosition({ row: -1, col: 0 }, 'col', 4);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 4 ship is partially within field (right border overflow)', function () {
      var ship = new ShipPosition({ row: 0, col: 8 }, 'row', 4);

      ship.within_field().should.be.false;
    });

    it('should return false if hull size 4 ship is partially within field (bottom border overflow)', function () {
      var ship = new ShipPosition({ row: 8, col: 0 }, 'col', 4);

      ship.within_field().should.be.false;
    });

    it('should return true if hull size 4 ship ends in lower right corner', function () {
      var ship = new ShipPosition({ row: 9, col: 6 }, 'row', 4);

      ship.within_field().should.be.true;
    });
  });

});

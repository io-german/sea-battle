import '../../chai_initializer.js';
import nop from '../../mock/nop.js';
import Model from '../../../../../app/assets/javascripts/game_field/arrangement/model.js';

describe('Arrangement model', function () {

  var model;

  beforeEach(function () {
    model = new Model(nop);
  });

  describe('constructor', function () {
    it('should set current_ship value to 0', function () {
      model.current_ship.should.equal(0);
    });

    it('should place ship on (0, 0) cell', function () {
      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;


      row.should.equal(0);
      col.should.equal(0);
    });

    it('should place ship with row rotation', function () {
      var rotation = model.currentPosition.rotation;

      rotation.should.equal('row');
    });
  });

  describe('move method', function () {
    it('should increase column and leave row the same if ship was moved right', function () {
      model.move('right');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(1);
    });

    it('should decrease column and leave row the same if ship was moved left', function () {
      model.move('right');
      model.move('left');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(0);
    });

    it('should increase row and leave column the same if ship is moved down', function () {
      model.move('down');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(1);
      col.should.equal(0);
    });

    it('should decrease row and leave column the same if ship is moved up', function () {
      model.move('down');
      model.move('up');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(0);
    });

    it('should not move ship outside left border', function () {
      model.move('left');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(0);
    });

    it('should not move ship outside top border', function () {
      model.move('up');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(0);
    });

    it('should not move ship outside right border', function () {
      for (let i = 0; i < 14; i++) {
        model.move('right');
      }

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(9);
    });

    it('should not move ship outside bottom border', function () {
      for (let i = 0; i < 14; i++) {
        model.move('down');
      }

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(9);
      col.should.equal(0);
    });

    it('should pass complex move test 1', function () {
      model.move('down');
      model.move('down');
      model.move('down');
      model.move('right');
      model.move('right');
      model.move('up');
      model.move('left');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(2);
      col.should.equal(1);
    });

    it('should pass complex move test 2', function () {
      model.move('down');
      model.move('down');
      model.move('down');
      model.move('left');
      model.move('right');
      model.move('right');
      model.move('up');
      model.move('left');

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(2);
      col.should.equal(1);
    });
  });

  describe('rotate method', function () {
    it('should change rotation', function () {
      model.rotate();

      var rotation = model.currentPosition.rotation;

      rotation.should.equal('col');
    });

    it('should return initial rotation when called two times', function () {
      model.rotate();
      model.rotate();

      var rotation = model.currentPosition.rotation;

      rotation.should.equal('row');
    });
  });

  describe('place method', function () {
    it('should add ship to the map (initial position)', function () {
      model.place();

      model.field[ 0 ][ 0 ].should.equal('s');
    });

    it('should add ship to the map (other position)', function () {
      model.move('right');
      model.move('right');
      model.move('right');
      model.move('down');
      model.place();

      model.field[ 1 ][ 3 ].should.equal('s');
    });

    it('should add ship to the map (large ship)', function () {
      model.current_ship = 9;

      model.move('right');
      model.move('right');
      model.move('right');
      model.move('down');
      model.place();

      var cell_before = model.field[ 1 ][ 2 ],
          cell1       = model.field[ 1 ][ 3 ],
          cell2       = model.field[ 1 ][ 4 ],
          cell3       = model.field[ 1 ][ 5 ],
          cell4       = model.field[ 1 ][ 6 ],
          cell_after  = model.field[ 1 ][ 7 ];

      cell_before.should.equal('');
      cell1.should.equal('s');
      cell2.should.equal('s');
      cell3.should.equal('s');
      cell4.should.equal('s');
      cell_after.should.equal('');
    });

    it('should switch to another ship', function () {
      model.place();

      model.current_ship.should.equal(1);
    });

    it('should return current_ship cursor to the (0, 0) cell', function () {
      model.move('right');
      model.move('down');
      model.place();

      var row = model.currentPosition.baseCoord.row,
          col = model.currentPosition.baseCoord.col;

      row.should.equal(0);
      col.should.equal(0);
    });
  });
});

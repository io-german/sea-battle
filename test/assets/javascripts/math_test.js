import * as math from '../../../app/assets/javascripts/math.js';
import './chai_initializer.js';

describe('Math', function () {
  describe('square', function () {
    it('should return 1 when a = 1', function () {
      math.square(1).should.equal(1);
    });

    it ('should return 225 when a = 15', function () {
      math.square(15).should.equal(225);
    });

    it ('should return 0 when a = 0', function () {
      math.square(0).should.equal(0);
    });
  });
});

import * as key_codes from '../../util/key_codes.js';
import view from './view.js';
import Model from './model.js';

export default function () {
  var model = new Model(view);

  document.addEventListener('keyup', function (e) {
    e.preventDefault();

    switch (e.keyCode) {
      case key_codes.LEFT_ARROW:
        model.move('left');
        break;
      case key_codes.RIGHT_ARROW:
        model.move('right');
        break;
      case key_codes.UP_ARROW:
        model.move('up');
        break;
      case key_codes.DOWN_ARROW:
        model.move('down');
        break;
      case key_codes.SPACE:
        model.rotate();
        break;
      case key_codes.ENTER:
        model.place();
        break;
    }
  });
}

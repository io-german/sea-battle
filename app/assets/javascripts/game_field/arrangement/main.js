import keycode from 'keycode';
import view from './view.js';
import Model from './model.js';

export default function () {
  var model = new Model(view);

  document.addEventListener('keyup', function (e) {
    e.preventDefault();

    switch (e.keyCode) {
      case keycode('space'):
        model.rotate();
        break;
      case keycode('enter'):
        model.place();
        break;
      default:
        model.move(keycode(e.keyCode));
        break;
    }
  });
}

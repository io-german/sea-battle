import keycode from 'keycode';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';
import Model from './model.js';

export default function () {
  var model = new Model(view);

  document.addEventListener('keyup', keyUpListener);

  pubsub.subscribe('arrangement.finished', function () {
    document.removeEventListener('keyup', keyUpListener);
    document.getElementsByClassName('arrangement-step')[ 0 ].style.display = 'none';
  });

  function keyUpListener (e) {
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
  }
}

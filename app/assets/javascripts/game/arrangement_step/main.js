import keycode from 'keycode';
import { model as masterModel } from '../model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';
import Model from './model.js';

export default class {

  subscribe () {
    var model         = new Model(view),
        keyUpListener = function (e) {
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
        };

    this.keyUpListener = keyUpListener;
    document.addEventListener('keyup', keyUpListener);

    this.arrangementFinishedListener = pubsub.subscribe('arrangement.finished', function () {
      masterModel.comm.arrangement();
    });
  }

  unsubscribe () {
    document.removeEventListener('keyup', this.keyUpListener);
    this.arrangementFinishedListener.remove();
  }
}

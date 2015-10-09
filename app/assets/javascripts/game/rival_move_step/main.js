import { model as masterModel } from '../model.js';
import Model from './model.js';
import view from './view.js';

export default class {
  subscribe () {
    var model = new Model(view);

    this.moveConfirmation = pubsub.subscribe('player_move_confirmation', function (data) {
      var row    = data.row,
          col    = data.col,
          result = model.rivalShot(row, col);

      masterModel.comm.respondToMove(row, col, result);
    });
  }

  unsubscribe () {
    this.moveConfirmation.remove();
  }
}

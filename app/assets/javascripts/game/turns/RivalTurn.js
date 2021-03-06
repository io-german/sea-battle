import { model as masterModel } from '../model.js';
import Model from './model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';

export default class {
  subscribe () {
    console.log('RIVAL_MOVE');
    var model = new Model(view);

    this.moveConfirmation = pubsub.subscribe('rival_move', function (data) {
      var row    = data.row,
          col    = data.col,
          result = model.rivalShot({ row: row, col: col });

      masterModel.comm.respondToMove(row, col, result);
    });
  }

  unsubscribe () {
    this.moveConfirmation.remove();
  }
}

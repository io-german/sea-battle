import Model from './model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';

export default class {
  subscribe () {
    var model = new Model(view);

    this.listener = pubsub.subscribe('player_move_result_confirmation', function (data) {
      model.ownShot({ row: data.row, col: data.col }, data.result);
      pubsub.publish('rival_move')
    });
  }

  unsubscribe () {
    this.listener && this.listener.remove();
  }
}

import Model from './model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';

export default function () {
  pubsub.subscribe('arrangement.finished', function (field) {
    var model      = new Model(view, field),
        rivalField = document.getElementById('rival-field');

    rivalField.addEventListener('click', fieldClickEvent);
    pubsub.subscribe('shot', (shotInfo) => model.shot(shotInfo.field, shotInfo.coord, shotInfo.result));

    function fieldClickEvent () {
      var coord  = { row: 0, col: 0 },
          result = 'm';

      pubsub.publish('shot', { field: 'rival', coord: coord, result: result });
    }
  });
}

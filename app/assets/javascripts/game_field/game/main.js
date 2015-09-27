import { GRID_SIZE } from '../constants.js';
import Model from './model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';

export default function () {
  pubsub.subscribe('arrangement.finished', function (field) {
    var model      = new Model(view, field),
        rivalField = document.getElementById('rival-field');

    rivalField.addEventListener('click', fieldClickEvent);

    pubsub.subscribe('shot.rival', function (shotInfo) {
      model.rivalShot({ row: shotInfo.row, col: shotInfo.col });
    });

    function fieldClickEvent (e) {
      var target = e.target,
          targetRect = target.getBoundingClientRect(),
          targetPosition = { x: Math.ceil(targetRect.left), y: Math.ceil(targetRect.top) },
          clickPosition = { x: e.clientX - targetPosition.x, y: e.clientY - targetPosition.y },
          coord  = {
            row: Math.floor(clickPosition.y / GRID_SIZE) - 1,
            col: Math.floor(clickPosition.x / GRID_SIZE) - 1
          },
          /* TODO: Ask server about actual result. */
          result = 'm';

      model.ownShot(coord, result);
    }
  });
}

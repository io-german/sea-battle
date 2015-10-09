import Model from './model.js';
import view from './view.js';

export default class {
  subscribe () {
    var model           = new Model(view),
        rivalField      = document.getElementById('rival-field'),
        fieldClickEvent = function (e) {
          var target         = e.target,
              targetRect     = target.getBoundingClientRect(),
              targetPosition = { x: Math.ceil(targetRect.left), y: Math.ceil(targetRect.top) },
              clickPosition  = { x: e.clientX - targetPosition.x, y: e.clientY - targetPosition.y },
              coord          = {
                row: Math.floor(clickPosition.y / GRID_SIZE) - 1,
                col: Math.floor(clickPosition.x / GRID_SIZE) - 1
              },
              /* TODO: Ask server about actual result. */
              result         = 'm';

          model.ownShot(coord, result);
        };

    this.rivalField = rivalField;
    this.clickListener = fieldClickEvent;
    rivalField.addEventListener('click', fieldClickEvent);
  }

  unsubscribe () {
    this.rivalField.removeEventListener('click', this.clickListener);
  }
}

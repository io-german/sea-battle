import { GRID_SIZE } from '../helper/constants.js';
import { model as masterModel } from '../model.js';

export default class {
  subscribe () {
    console.log('OWN_MOVE');
    document.getElementById('rival-field').addEventListener('click', clickHandler);
  }

  unsubscribe () {
    document.getElementById('rival-field').removeEventListener('click', clickHandler);
  }
}

function clickHandler (e) {
  var target         = e.target,
      targetRect     = target.getBoundingClientRect(),
      targetPosition = { x: Math.ceil(targetRect.left), y: Math.ceil(targetRect.top) },
      clickPosition  = { x: e.clientX - targetPosition.x, y: e.clientY - targetPosition.y },
      row            = Math.floor(clickPosition.y / GRID_SIZE) - 1,
      col            = Math.floor(clickPosition.x / GRID_SIZE) - 1;

  masterModel.comm.move(row, col);
}

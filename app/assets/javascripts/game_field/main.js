/* eslint no-unused-vars: 0 */
import Model from './model.js';
import View from './view.js';
import getLetter from '../util/letters.js';

export default function () {
  var ownField       = document.getElementById('own-field'),
      rivalField     = document.getElementById('rival-field'),
      ownFieldView   = new View(ownField),
      rivalFieldView = new View(rivalField),
      own            = new Model(ownFieldView),
      rival          = new Model(rivalFieldView);

  Array.prototype.forEach.call(
    document.getElementsByTagName('canvas'),
    (canvas) => canvas.addEventListener('click', callback));

  function callback(e) {
    var target = e.target,
        targetRect = target.getBoundingClientRect(),
        targetPosition = { x: Math.ceil(targetRect.left), y: Math.ceil(targetRect.top) },
        clickPosition = { x: e.clientX - targetPosition.x, y: e.clientY - targetRect.top },
        cell = { row: Math.floor(clickPosition.y / 25), col: getLetter(Math.floor(clickPosition.x / 25) - 1) };

    if (cell.col && cell.row) {
      console.log(cell.col + cell.row);
    }
  }

  ownFieldView.draw();
  rivalFieldView.draw();
}

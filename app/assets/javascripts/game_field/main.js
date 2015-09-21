/* eslint no-unused-vars: 0 */
import Model from './model.js';
import View from './view.js';
import get_letter from '../util/letters.js';

export default function () {
  var own_field        = document.getElementById('own-field'),
      rival_field      = document.getElementById('rival-field'),
      own_field_view   = new View(own_field),
      rival_field_view = new View(rival_field),
      own              = new Model(own_field_view),
      rival            = new Model(rival_field_view);

  Array.prototype.forEach.call(
    document.getElementsByTagName('canvas'),
    (canvas) => canvas.addEventListener('click', callback));

  function callback (e) {
    var target          = e.target,
        target_rect     = target.getBoundingClientRect(),
        target_position = { x: Math.ceil(target_rect.left), y: Math.ceil(target_rect.top) },
        click_position  = { x: e.clientX - target_position.x, y: e.clientY - target_rect.top },
        cell            = { row: Math.floor(click_position.y / 25) - 1, col: Math.floor(click_position.x / 25 - 1) };

    if (cell.col >= 0 && cell.row >= 0) {
      own.update_cell(cell.col, cell.row, 'wounded');
    }
  }

  own_field_view.draw();
  rival_field_view.draw();
}

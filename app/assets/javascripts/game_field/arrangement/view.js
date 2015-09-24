import Canvas from '../../canvas/Canvas.js';
import Rectangle from '../../canvas/primitives/Rectangle.js';

import { drawMarkings, drawShips } from '../helper/canvas_routines.js';

var GRID_SIZE = 25;

export default function (model) {
  var canvasElement = document.getElementById('arrangement-field'),
      canvas        = new Canvas(canvasElement);

  canvas.clear();
  drawMarkings(canvas);
  drawShips(canvas, model.field);
  drawCurrentShip(canvas, model.currentPosition, model.valid);
}

function drawCurrentShip (canvas, currentPosition, valid) {
  var color = valid ? '#007700' : '#770000';

  for (let i = 0; i < currentPosition.coords.length; i++) {
    let cell = currentPosition.coords[ i ],
        left = (cell.col + 1) * GRID_SIZE,
        top  = (cell.row + 1) * GRID_SIZE,
        rect = new Rectangle(left, top, GRID_SIZE, GRID_SIZE);

    canvas.fillRect(rect, color);
  }

  canvas.stroke();
}

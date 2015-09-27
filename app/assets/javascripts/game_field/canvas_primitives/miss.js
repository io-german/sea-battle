import Rectangle from '../../canvas/primitives/Rectangle.js';
import { GRID_SIZE } from '../constants.js';

export default function (canvas, row, col) {
  var cellLeft = (col + 1) * GRID_SIZE,
      cellTop  = (row + 1) * GRID_SIZE,
      cellHorizontalMiddle = Math.floor(cellLeft + GRID_SIZE / 2),
      cellVerticalMiddle = Math.floor(cellTop + GRID_SIZE / 2),
      rect = new Rectangle(cellHorizontalMiddle - 2, cellVerticalMiddle - 2, 4, 4);

  canvas.fillRect(rect, 'black');
}

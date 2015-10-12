import Rectangle from '../../canvas/primitives/Rectangle.js';
import { GRID_SIZE } from '../helper/constants.js';

export default function (canvas, row, col) {
  var left = (col + 1) * GRID_SIZE,
      top  = (row + 1) * GRID_SIZE,
      rect = new Rectangle(left, top, GRID_SIZE, GRID_SIZE);

  canvas.fillRect(rect, 'black');
}

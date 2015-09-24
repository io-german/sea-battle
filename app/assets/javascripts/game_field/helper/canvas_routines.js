import getLetter from '../../util/letters.js';
import { GRID_SIZE } from '../constants.js';
import ship from '../canvas_primitives/ship.js';
import Point from '../../canvas/primitives/Point.js';

export function drawMarkings (canvas) {
  for (let i = 0; i < 10; i++) {
    canvas.text(getLetter(i), new Point(GRID_SIZE + i * GRID_SIZE, GRID_SIZE));
    canvas.text(i + 1, new Point(0, 2 * GRID_SIZE + i * GRID_SIZE));
  }

  for (let i = 0; i < 11; i++) {
    canvas.line(new Point(GRID_SIZE, GRID_SIZE * (1 + i)), new Point(11 * GRID_SIZE, GRID_SIZE * (1 + i)));
    canvas.line(new Point(GRID_SIZE * (i + 1), GRID_SIZE), new Point(GRID_SIZE * (i + 1), 11 * GRID_SIZE));
  }

  canvas.stroke();
}

export function drawShips (canvas, field) {
  for (let rowIndex = 0; rowIndex < field.length; rowIndex++) {
    for (let colIndex = 0; colIndex < field[ rowIndex ].length; colIndex++) {
      switch (field[rowIndex][colIndex]) {
        case 's':
          ship(canvas, rowIndex, colIndex);
          break;
      }
    }
  }
  canvas.stroke();
}

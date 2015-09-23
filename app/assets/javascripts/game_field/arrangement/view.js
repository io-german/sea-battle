import Canvas from '../../canvas/Canvas.js';
import getLetter from '../../util/letters.js';
import Point from '../../canvas/primitives/Point.js';
import Rectangle from '../../canvas/primitives/Rectangle.js';

var GRID_SIZE = 25;

export default function (model) {
  var canvasElement = document.getElementById('arrangement-field'),
      canvas        = new Canvas(canvasElement);

  canvas.clear();
  drawMarkings(canvas);
  drawShips(canvas, model.field);
  drawCurrentShip(canvas, model.currentPosition, model.valid);
}

function drawMarkings (canvas) {
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

function drawShips (canvas, field) {
  for (let rowIndex = 0; rowIndex < field.length; rowIndex++) {
    for (let colIndex = 0; colIndex < field[ rowIndex ].length; colIndex++) {
      if (field[ rowIndex ][ colIndex ] === 's') {
        let left = (colIndex + 1) * GRID_SIZE,
            top  = (rowIndex + 1) * GRID_SIZE,
            rect = new Rectangle(left, top, GRID_SIZE, GRID_SIZE);

        canvas.fillRect(rect, 'black');
      }
    }
  }
  canvas.stroke();
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

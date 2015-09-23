import Canvas from '../../canvas/Canvas.js';
import get_letter from '../../util/letters.js';
import Point from '../../canvas/primitives/Point.js';
import Rectangle from '../../canvas/primitives/Rectangle.js';

var grid_size = 25;

export default function (model) {
  var canvasElement = document.getElementById('arrangement-field'),
      canvas        = new Canvas(canvasElement);

  canvas.clear();
  draw_markings(canvas);
  draw_ships(canvas, model.field);
  draw_current_ship(canvas, model.current_position, model.valid);
}

function draw_markings (canvas) {
  for (let i = 0; i < 10; i++) {
    canvas.text(get_letter(i), new Point(grid_size + i * grid_size, grid_size));
    canvas.text(i + 1, new Point(0, 2 * grid_size + i * grid_size));
  }

  for (let i = 0; i < 11; i++) {
    canvas.line(new Point(grid_size, grid_size * (1 + i)), new Point(11 * grid_size, grid_size * (1 + i)));
    canvas.line(new Point(grid_size * (i + 1), grid_size), new Point(grid_size * (i + 1), 11 * grid_size));
  }

  canvas.stroke();
}

function draw_ships (canvas, field) {
  for (let row_index = 0; row_index < field.length; row_index++) {
    for (let col_index = 0; col_index < field[row_index].length; col_index++) {
      if (field[row_index][col_index] === 's') {
        let left = (col_index + 1) * grid_size,
            top = (row_index + 1) * grid_size,
            rect = new Rectangle(left, top, grid_size, grid_size);

        canvas.fill_rect(rect, 'black');
      }
    }
  }
  canvas.stroke();
}

function draw_current_ship (canvas, current_position, valid) {
  var color = valid ? '#007700' : '#770000';

  for (let i = 0; i < current_position.coords.length; i++) {
    let cell = current_position.coords[i],
        left = (cell.col + 1) * grid_size,
        top = (cell.row + 1) * grid_size,
        rect = new Rectangle(left, top, grid_size, grid_size);

    canvas.fill_rect(rect, color);
  }

  canvas.stroke();
}

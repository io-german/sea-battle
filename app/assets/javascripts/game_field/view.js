/* eslint no-unused-vars: 0 */
import get_letter from '../util/letters.js';
import Canvas from '../canvas/Canvas.js';
import Point from '../canvas/primitives/Point.js';
import Rectangle from '../canvas/primitives/Rectangle.js';

export default class {
  constructor (canvas) {
    this.canvas = new Canvas(canvas);
  }

  draw (model) {
    this.canvas.clear();
    draw_markings(this.canvas);
    draw_ships(this.canvas, model);
  }
}

function draw_markings (canvas) {
  for (let i = 0; i < 10; i++) {
    canvas.text(get_letter(i), new Point(25 + i * 25, 25));
    canvas.text(i + 1, new Point(0, 50 + i * 25));
  }

  for (let i = 0; i < 11; i++) {
    canvas.line(new Point(25, 25 * (1 + i)), new Point(11 * 25, 25 * (1 + i)));
    canvas.line(new Point(25 * (i + 1), 25), new Point(25 * (i + 1), 11* 25));
  }

  canvas.stroke();
}

function draw_ships (canvas, model) {
  model && model.forEach(function (row, row_index) {
    row.forEach(function (cell, col_index) {
      if (cell === 'wounded') {
        let rect = new Rectangle(25 * (row_index + 1), 25 * (col_index + 1), 25, 25);
        canvas.rect_diagonals(rect);
      }
    });
  });
  canvas.stroke();
}

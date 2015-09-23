import _clear from './clear.js';
import _fill_rect from './fill_rect.js';
import _line from './line.js';
import _rect_diagonals from './rect_diagonals.js';

export default class {
  constructor (canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  clear () {
    _clear(this.context, this.canvas);
  }

  line (from, to) {
    _line(this.context, from, to);
  }

  rect_diagonals (rect) {
    _rect_diagonals(this.context, rect);
  }

  fill_rect (rect, color) {
    _fill_rect(this.context, rect, color);
  }

  stroke () {
    this.context.stroke();
  }

  text (value, position) {
    this.context.fillText(value, position.x, position.y);
  }
}

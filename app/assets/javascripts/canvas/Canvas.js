import _clear from './clear.js';
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

  stroke () {
    this.context.stroke();
  }

  text (value, position) {
    this.context.fillText(value, position.x, position.y);
  }
}

import _clear from './clear.js';
import _fillRect from './fill_rect.js';
import _line from './line.js';
import _rectDiagonals from './rect_diagonals.js';

export default class {
  constructor (canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  clear () {
    _clear(this.context, this.canvas);
  }

  line (from, to, color) {
    this.withColor(color, () => _line(this.context, from, to));
  }

  rectDiagonals (rect, color) {
    this.withColor(color, () => _rectDiagonals(this.context, rect));
  }

  fillRect (rect, color) {
    this.withColor(color, () => _fillRect(this.context, rect));
  }

  stroke () {
    this.context.stroke();
  }

  text (value, position) {
    this.context.fillText(value, position.x, position.y);
  }

  withColor (color, fn) {
    var currentFillStyle = this.context.fillStyle;

    if (color) {
      this.context.fillStyle = color;
    }

    fn();

    this.context.fillStyle = currentFillStyle;
  }
}

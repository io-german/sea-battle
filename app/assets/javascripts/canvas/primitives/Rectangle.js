import Point from './Point.js';

export default class {
  constructor (left, top, width, height) {
    this.left = left;
    this.top = top;
    this.right = left + width;
    this.bottom = top + height;
  }

  top_left () {
    return new Point(this.left, this.top);
  }

  top_right () {
    return new Point(this.right, this.top);
  }

  bottom_left () {
    return new Point(this.left, this.bottom);
  }

  bottom_right () {
    return new Point(this.right, this.bottom);
  }

}
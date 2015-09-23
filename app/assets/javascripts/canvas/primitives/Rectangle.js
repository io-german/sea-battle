import Point from './Point.js';

export default class {
  constructor (left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  get right () {
    return this.left + this.width;
  }

  get bottom () {
    return this.top + this.height;
  }

  topLeft () {
    return new Point(this.left, this.top);
  }

  topRight () {
    return new Point(this.right, this.top);
  }

  bottomLeft () {
    return new Point(this.left, this.bottom);
  }

  bottomRight () {
    return new Point(this.right, this.bottom);
  }

}

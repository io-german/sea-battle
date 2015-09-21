/* eslint no-unused-vars: 0 */
import getLetter from '../util/letters.js';

export default class {
  constructor (canvas) {
    this.canvas = canvas;
  }

  draw (model) {
    var ctx = this.canvas.getContext('2d');

    drawMarkings(ctx);
  }
}

function drawMarkings (ctx) {
  ctx.font = '25px serif';
  for (let i = 0; i < 10; i++) {
    ctx.fillText(getLetter(i), 25 + i * 25, 25);
  }

  for (let i = 0; i < 10; i++) {
    ctx.fillText(i + 1, 0, 50 + i * 25);
  }

  ctx.beginPath();
  for (let i = 0; i < 11; i++) {
    ctx.moveTo(25, 25 + 25 * i);
    ctx.lineTo(725, 25 + 25 * i);

    ctx.moveTo(25 + 25 * i, 25);
    ctx.lineTo(25 + 25 * i, 725);
  }
  ctx.stroke();
}

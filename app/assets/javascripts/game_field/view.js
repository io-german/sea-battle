/* eslint no-unused-vars: 0 */

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
  var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k' ];

  ctx.font = '25px serif';
  letters.forEach(function (letter, index) {
    ctx.fillText(letter, 25 + index * 25, 25);
  });

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

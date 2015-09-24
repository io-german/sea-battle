import Canvas from '../../canvas/Canvas.js';
import { drawMarkings, drawShips } from '../helper/canvas_routines.js';

export default function (model) {
  var own   = document.getElementById('own-field'),
      rival = document.getElementById('rival-field');

  draw(own, model.own);
  draw(rival, model.rival);
}

function draw (canvasElem, field) {
  var canvas = new Canvas(canvasElem);

  canvas.clear();
  drawMarkings(canvas);
  drawShips(canvas, field);
}

import Canvas from '../../canvas/Canvas.js';

export default function (ownModel, rivalModel) {
  var own   = document.getElementById('own-field'),
      rival = document.getElementById('rival-field');

  displayCorrectBlock();
  draw(own, ownModel);
  draw(rival, rivalModel);
}

function displayCorrectBlock () {
  var steps = document.getElementsByClassName('step'),
      gameStep = document.getElementsByClassName('game-step')[0];

  Array.prototype.forEach.call(steps, (step) => step.style.display = 'none');
  gameStep.style.display = 'block';
}

function draw (canvasElem, field) {
  var canvas = new Canvas(canvasElem);

  canvas.clear();
  drawMarkings(canvas);
  drawShips(canvas, field);
}

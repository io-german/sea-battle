import Model from './model.js';
import view from './view.js';

export default function () {
  var model = new Model(view),
      step = document.getElementsByClassName('connection-step')[0],
      button = step.getElementsByTagName('button')[0],
      input = step.getElementsByTagName('input')[0];

  button.addEventListener('click', function () {
    model.submit(input.value);
  });
}

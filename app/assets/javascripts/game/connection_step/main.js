import { model as masterModel } from '../model.js';
import Model from './model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';

export default function () {
  var model = new Model(view),
      step = document.getElementsByClassName('connection-step')[0],
      button = step.getElementsByTagName('button')[0],
      input = step.getElementsByTagName('input')[0];

  button.addEventListener('click', function () {
    masterModel.comm.connect(input.value);
  });

  pubsub.subscribe('connection_response', function (data) {
    model.submit(data.gen_name, data.auth);
  });
}

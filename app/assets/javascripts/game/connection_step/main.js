import { model as masterModel } from '../model.js';
import Model from './model.js';
import { pubsub } from '../../util/pubsub.js';
import view from './view.js';

export default class ConnectionStep {
  subscribe () {
    var model = new Model(view),
        step = document.getElementsByClassName('connection-step')[0],
        button = step.getElementsByTagName('button')[0],
        input = step.getElementsByTagName('input')[0];

    this.button = button;
    this.clickHandler = function () {
      masterModel.comm.connect(input.value);
    };

    button.addEventListener('click', this.clickHandler);

    this.connectionResponseListener = pubsub.subscribe('connection_response', function (data) {
      model.submit(data.gen_name, data.auth);
    });
  }

  unsubscribe () {
    this.connectionResponseListener.remove();
    this.button.removeEventListener('click', this.clickHandler);
  }
}

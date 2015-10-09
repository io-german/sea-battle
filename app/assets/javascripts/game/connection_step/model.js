import { model as masterModel } from '../model.js';
import { pubsub } from '../../util/pubsub.js';

export default class {
  constructor (view) {
    masterModel.currentStep = 'connection';
    this.view = view;
    view();
  }

  submit (userName, authToken) {
    masterModel.userName = userName;
    masterModel.authToken = authToken;
    pubsub.publish('connection.successful');
  }
}

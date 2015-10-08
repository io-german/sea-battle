import { model as masterModel } from '../../model.js';

export default class {
  constructor (view) {
    this.view = view;
    view();
  }

  submit (userName) {
    masterModel.userName = userName;
  }
}

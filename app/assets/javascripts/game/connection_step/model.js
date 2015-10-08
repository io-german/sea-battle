import {model as masterModel} from '../../model.js';

export default class {
  constructor(view) {
    this.view = view;
  }

  get userName() {
    return this._userName;
  }

  set userName(value) {
    this._userName = value;
    view(this);
  }

  submit () {
    masterModel.userName = this.userName;
  }
}

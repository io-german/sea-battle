import createField from '../game_field/helper/create_field.js';

class Model {
  constructor () {
    this.ownField = createField();
    this.rivalField = createField();
  }

  get currentStep () {
    return this._currentStep;
  }

  set currentStep (value) {
    this._currentStep = value;
  }

  get comm () {
    return this._comm;
  }

  set comm (value) {
    this._comm = value;
  }

  get authToken () {
    return this._authToken;
  }

  set authToken (value) {
    this.comm.auth = value;
    this._authToken = value;
    console.log(value);
  }

  get userName () {
    return this._userName;
  }

  set userName (value) {
    this.comm.genName = value;
    this._userName = value;
    console.log(value);
  }

}

export const model = new Model();

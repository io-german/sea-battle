class Model {
  constructor () {}

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
    this._authToken = value;
    console.log(value);
  }

  get userName () {
    return this._userName;
  }

  set userName (value) {
    this._userName = value;
    console.log(value);
  }
}

export const model = new Model();

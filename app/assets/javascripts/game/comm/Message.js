export default class {
  constructor (message) {
    this.message = message;
  }

  serialize () {
    return JSON.stringify(this);
  }
}

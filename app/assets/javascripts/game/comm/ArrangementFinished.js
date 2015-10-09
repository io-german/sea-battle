import Message from './Message.js';

export default class extends Message {
  constructor (genName, auth) {
    super('arrangement_finished');
    this.gen_name = genName;
    this.auth = auth;
  }
}

import Message from './Message.js';

export default class extends Message {
  constructor (userName) {
    super('connection_request');
    this.user_name = userName;
  }
}

import Message from './Message.js';

export default class extends Message {
  constructor (genName, auth, row, col) {
    super('player_move');
    this.gen_name = genName;
    this.auth = auth;
    this.row = row;
    this.col = col;
  }
}

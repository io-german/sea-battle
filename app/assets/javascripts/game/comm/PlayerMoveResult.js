import Message from './Message.js';

export default class extends Message {
  constructor (genName, auth, row, col, result) {
    super('player_move_result');
    this.gen_name = genName;
    this.auth = auth;
    this.row = row;
    this.col = col;
    this.result = result;
  }
}

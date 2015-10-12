import ArrangementFinished from './ArrangementFinished.js';
import ConnectionRequest from './ConnectionRequest.js';
import PlayerMove from './PlayerMove.js';
import PlayerMoveResult from './PlayerMoveResult.js';
import { pubsub } from '../../util/pubsub.js';
import websocket from '../../websocket/main.js';

var url = 'ws://localhost:9000/subscribe';

export default class WebsocketComm {
  constructor () {
    this.socket = websocket(url);
    this.socket.onmessage = function (e) {
      var msg = JSON.parse(e.data);

      pubsub.publish(msg.message, msg);
    };
  }

  get genName () {
    return this._genName;
  }

  set genName (value) {
    this._genName = value;
  }

  get auth () {
    return this._auth;
  }

  set auth (value) {
    this._auth = value;
  }

  connect (userName) {
    this.socket.send(new ConnectionRequest(userName).serialize());
  }

  arrangement () {
    this.socket.send(new ArrangementFinished(this.genName, this.auth).serialize());
  }

  move (row, col) {
    this.socket.send(new PlayerMove(this.genName, this.auth, row, col).serialize());
  }

  respondToMove (row, col, result) {
    this.socket.send(new PlayerMoveResult(this.genName, this.auth, row, col, result).serialize());
  }
}

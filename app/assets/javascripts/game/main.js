import ArrangementStep from './arrangement_step/main.js';
import ConnectionStep from './connection_step/main.js';
import { model } from './model.js';
import { pubsub } from '../util/pubsub.js';
import OwnMove from './own_move_step/main.js';
import RivalMove from './rival_move_step/main.js';
import WebsocketComm from './comm/WebsocketComm.js';
//import gameOver from './game_over_step/main.js';
//import own_move from './own_move_step/main.js';
//import rival_move from './rival_move_step/main.js';

export default function () {
  model.comm = new WebsocketComm();

  var currentState;

  changeState(ConnectionStep);

  pubsub.subscribe('connection.successful', function (data) {
    model.userName = data.userName;
    model.authToken = data.authToken;
    currentState.unsubscribe();
  });

  pubsub.subscribe('arrangement_start', function () {
    currentState = new ArrangementStep();
    currentState.subscribe();
  });

  pubsub.subscribe('arrangement.finished', function (data) {
    model.ownField = data;
  });

  pubsub.subscribe('game_start', function () {
    changeState(RivalMove);
  });

  pubsub.subscribe('your_move', function () {
    changeState(OwnMove);
  });

  pubsub.subscribe('');

  function changeState(state) {
    currentState && currentState.unsubscribe();
    currentState = new state();
    currentState.subscribe();
  }
}

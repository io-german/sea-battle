import ArrangementStep from './arrangement_step/main.js';
import ConnectionStep from './connection_step/main.js';
import { model } from './model.js';
import { pubsub } from '../util/pubsub.js';
import OwnMove from './turns/OwnTurn.js';
import RivalTurn from './turns/RivalTurn.js';
import WaitRivalResponse from './turns/WaitRivalResponse.js';
import WebsocketComm from './comm/WebsocketComm.js';

export default function () {
  model.comm = new WebsocketComm();

  var currentState;

  changeState(ConnectionStep)();

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

  pubsub.subscribe('rival_turn', changeState(RivalTurn));

  pubsub.subscribe('your_turn', changeState(OwnMove));

  pubsub.subscribe('player_move_confirmation', changeState(WaitRivalResponse));

  pubsub.subscribe('rival_move_started', changeState(RivalTurn));

  pubsub.subscribe('game_over', function (data) {
    console.log(`winner is ${data.winner}`);
  });

  function changeState (State) {
    return function () {
      currentState && currentState.unsubscribe && currentState.unsubscribe();
      currentState = new State();
      currentState.subscribe();
    };
  }
}

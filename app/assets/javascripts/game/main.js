import ArrangementStep from './arrangement_step/main.js';
import ConnectionStep from './connection_step/main.js';
import { model } from './model.js';
import { pubsub } from '../util/pubsub.js';
import WebsocketComm from './comm/WebsocketComm.js';
//import gameOver from './game_over_step/main.js';
//import own_move from './own_move_step/main.js';
//import rival_move from './rival_move_step/main.js';

export default function () {
  model.comm = new WebsocketComm();

  var connection = new ConnectionStep(),
      arrangement = new ArrangementStep();

  connection.subscribe();

  pubsub.subscribe('connection.successful', function (data) {
    model.userName = data.userName;
    model.authToken = data.authToken;
    connection.unsubscribe();
  });

  pubsub.subscribe('arrangement_start', function () {
    arrangement.subscribe();
  });

  pubsub.subscribe('arrangement.finished', function (data) {
    model.field = data;
  });

  pubsub.subscribe('game_start', function () {
    arrangement.unsubscribe();
  });
}

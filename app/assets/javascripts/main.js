import game_field from './game_field/game/main.js';
import arrangement from './game_field/arrangement/main.js';
import websocket from './websocket/main.js';

game_field();
arrangement();
var socket = websocket('ws://localhost:9000/subscribe');

setTimeout(() => socket.send('ololo'), 5);

window.socket = socket;

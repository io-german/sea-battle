import game_field from './game_field/main.js';
import websocket from './websocket/main.js';

game_field();
var socket = websocket('ws://localhost:9000/subscribe');

setTimeout(() => socket.send('ololo'), 5);

window.socket = socket;

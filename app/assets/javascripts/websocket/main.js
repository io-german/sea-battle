export default function (wsUri) {
  var websocket = new WebSocket(wsUri);
  websocket.onopen = (evt) => console.log('OPEN');
  websocket.onclose = (evt) => console.log('CLOSE');
  websocket.onerror = (evt) => console.log('ERROR');
  websocket.onmessage = (evt) => console.log(evt.data);
  return websocket;
};

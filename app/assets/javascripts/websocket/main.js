export default function (wsUri) {
  var websocket = new WebSocket(wsUri);

  websocket.onopen = () => console.log('OPEN');
  websocket.onclose = () => console.log('CLOSE');
  websocket.onerror = () => console.log('ERROR');
  websocket.onmessage = (evt) => console.log(evt.data);
  return websocket;
}

class PubSub {
  constructor () {
    this.listeners = {};
  }

  publish (topic, payload) {
    this.listeners[topic] && this.listeners[topic].forEach((listener) => listener(payload));
  }

  subscribe (topic, callback) {
    var listeners = this.listeners;

    if (!listeners[topic]) {
      listeners[topic] = [];
    }

    var index = listeners[topic].push(callback) - 1;

    return {
      remove: function () {
        delete listeners[topic][index];
      }
    };
  }
}

export const pubsub = new PubSub();

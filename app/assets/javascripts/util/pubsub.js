class PubSub {
  constructor () {
    this.listeners = {};
  }

  publish (topic, payload) {
    this.listeners[topic] && this.listeners[topic].forEach((listener) => listener(payload));
  }

  subscribe (topic, callback) {
    if (!this.listeners[topic]) {
      this.listeners[topic] = [];
    }

    this.listeners[topic].push(callback);
  }
}

export const pubsub = new PubSub();

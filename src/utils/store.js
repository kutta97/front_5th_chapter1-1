class Subject {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

class Store extends Subject {
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify(this.state);
  }

  getState() {
    return this.state;
  }
}

export default Store;

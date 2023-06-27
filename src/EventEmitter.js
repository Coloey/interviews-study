class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(handler);
  }
  prependListener(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].unshift(handler);
  }
  off(type, handler) {
    if (!this.events[type]) {
      return;
    }
    this.events[type] = this.events[type].filter((item) => item !== handler);
  }
  emit(type, ...args) {
    this.events[type].forEach((item) => {
      Reflect.apply(item, this, args);
    });
  }
  once(type, handler) {
    function temp(...args) {
      handler(args);
      this.off(type, handler);
    }
    this.on(type, temp); //为事件注册单次监听器
  }
}

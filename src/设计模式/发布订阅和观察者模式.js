/*发布-订阅模式（Publish-Subscribe Pattern）和观察者模式（Observer Pattern）是两种常见的行为设计模式，它们之间有一些区别。

区别如下：
1. 关注点不同：
发布-订阅模式强调的是发布者（或事件管理中心）与订阅者之间的解耦，发布者不直接与订阅者通信，而是通过事件中心来传递消息。
观察者模式则强调的是一个被观察者与多个观察者之间的关系，被观察者会通知观察者状态的变化。

2. 职责不同：在发布-订阅模式中，事件管理中心（或发布者）负责管理订阅和发布事件，它不关心谁订阅了这些事件。而在观察者模式中，被观察者负责管理观察者，并在状态变化时通知观察者。

下面是一个简单的示例来说明两者之间的区别：

发布-订阅模式示例：*/

// 事件中心
const eventHub = {
  events: {},
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  publish(event, data) {
    const callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(data);
      });
    }
  },
};

// 订阅者
eventHub.subscribe("message", (data) => {
  console.log("收到消息:", data);
});

// 发布者
eventHub.publish("message", "Hello, World!");

//观察者模式示例：

// 被观察者
class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notifyObservers(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

// 观察者
class Observer {
  update(data) {
    console.log("收到消息:", data);
  }
}

// 创建被观察者和观察者
const subject = new Subject();
const observer = new Observer();

// 绑定观察者
subject.addObserver(observer);

// 通知观察者
subject.notifyObservers("Hello, World!");

/*在发布-订阅模式中，事件中心作为一个中间人，负责管理订阅和发布事件。在观察者模式中，被观察者负责管理观察者，
并在状态变化时通知观察者。两者的实现方式和调用方式有一些不同，但都可以实现组件之间的解耦和消息传递。*/

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*发布-订阅模式（Publish-Subscribe Pattern）和观察者模式（Observer Pattern）是两种常见的行为设计模式，它们之间有一些区别。

区别如下：
1. 关注点不同：
发布-订阅模式强调的是发布者（或事件管理中心）与订阅者之间的解耦，发布者不直接与订阅者通信，而是通过事件中心来传递消息。
观察者模式则强调的是一个被观察者与多个观察者之间的关系，被观察者会通知观察者状态的变化。

2. 职责不同：在发布-订阅模式中，事件管理中心（或发布者）负责管理订阅和发布事件，它不关心谁订阅了这些事件。而在观察者模式中，被观察者负责管理观察者，并在状态变化时通知观察者。

下面是一个简单的示例来说明两者之间的区别：

发布-订阅模式示例：*/
// 事件中心
var eventHub = {
  events: {},
  subscribe: function subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  },
  publish: function publish(event, data) {
    var callbacks = this.events[event];

    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  }
}; // 订阅者

eventHub.subscribe("message", function (data) {
  console.log("收到消息:", data);
}); // 发布者

eventHub.publish("message", "Hello, World!"); //观察者模式示例：
// 被观察者

var Subject =
/*#__PURE__*/
function () {
  function Subject() {
    _classCallCheck(this, Subject);

    this.observers = [];
  }

  _createClass(Subject, [{
    key: "addObserver",
    value: function addObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(observer) {
      this.observers = this.observers.filter(function (obs) {
        return obs !== observer;
      });
    }
  }, {
    key: "notifyObservers",
    value: function notifyObservers(data) {
      this.observers.forEach(function (observer) {
        observer.update(data);
      });
    }
  }]);

  return Subject;
}(); // 观察者


var Observer =
/*#__PURE__*/
function () {
  function Observer() {
    _classCallCheck(this, Observer);
  }

  _createClass(Observer, [{
    key: "update",
    value: function update(data) {
      console.log("收到消息:", data);
    }
  }]);

  return Observer;
}(); // 创建被观察者和观察者


var subject = new Subject();
var observer = new Observer(); // 绑定观察者

subject.addObserver(observer); // 通知观察者

subject.notifyObservers("Hello, World!");
/*在发布-订阅模式中，事件中心作为一个中间人，负责管理订阅和发布事件。在观察者模式中，被观察者负责管理观察者，
并在状态变化时通知观察者。两者的实现方式和调用方式有一些不同，但都可以实现组件之间的解耦和消息传递。*/
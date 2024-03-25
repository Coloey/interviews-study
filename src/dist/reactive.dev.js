"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var targetMap = new WeakMap();
var activeEffect = null;

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

function track(target, key) {
  if (activeEffect) {
    var depsMap = targetMap.get(target);

    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }

    var dep = depsMap.get(key);

    if (!dep) {
      depsMap.set(key, dep = new Set());
    }

    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  var depsMap = targetMap.get(target);
  if (!depsMap) return;
  var dep = depsMap.get(key);

  if (dep) {
    dep.forEach(function (effect) {
      effect();
    });
  }
}

function reactive(target) {
  var handler = {
    get: function get(target, key, receiver) {
      var res = Reflect.get(target, key, receiver); //这里用Reflect的原因是修正this指向，相当于target.apply(receiver)

      track(target, key); //if reactive property is Get inside then tarck the effect to rerun on SET,add the effect to the dep

      return res;
    },
    set: function set(target, key, value, receiver) {
      var oldValue = target[key];
      var res = Reflect.set(target, key, value, receiver);

      if (res && oldValue != value) {
        trigger(target, key); //if this reactive property has effects to rerun on SET,trigger them
      }

      return res;
    }
  };
  return new Proxy(target, handler);
}

function ref(raw) {
  var r = {
    get value() {
      track(r, "value");
      return raw;
    },

    set value(newval) {
      raw = newval;
      trigger(r, "value");
    }

  };
  return r;
}

var product = reactive({
  price: 5,
  quantity: 2
});
var salePrice = ref(0);
var total = 0;
effect(function () {
  salePrice.value = product.price * 0.9;
});
effect(function () {
  total = salePrice.value * product.quantity;
});
console.log("Before updated quantity total=".concat(total, " salePrice=").concat(salePrice.value));
product.quantity = 3;
console.log("After updated quantity total=".concat(total, " salePrice=").concat(salePrice.value));
product.price = 10;
console.log("After updated quantity total=".concat(total, " salePrice=").concat(salePrice.value)); // Vue2 观察者模式

function observe(target) {
  if (target & _typeof(target) === 'object') {
    Object.keys(target).forEach(function (key) {
      defineReactive(target, key, target[key]);
    });
  }
} //观察者


var Sub =
/*#__PURE__*/
function () {
  function Sub() {
    _classCallCheck(this, Sub);

    console.log('observer create');
  }

  _createClass(Sub, [{
    key: "update",
    value: function update(key, value) {
      console.log("".concat(key, "\u5C5E\u6027\u53D8\u6210\u4E86\u4E86").concat(value));
    }
  }]);

  return Sub;
}(); //被观察者


var Dep =
/*#__PURE__*/
function () {
  function Dep() {
    _classCallCheck(this, Dep);

    //初始化订阅队列
    this.subs = [];
  } //增加观察者


  _createClass(Dep, [{
    key: "addSub",
    value: function addSub(sub) {
      this.subs.push(sub);
    } //通知观察者

  }, {
    key: "notify",
    value: function notify(key, value) {
      this.subs.forEach(function (sub) {
        if (sub === key) {
          sub.update(key, value);
        }
      });
    }
  }]);

  return Dep;
}();

function defineReactive(target, key, val) {
  var dep = new Dep(); //对象递归调用

  observe(val);
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function get() {
      return val;
    },
    set: function set(value) {
      //通知观察者
      dep.notify(key, value);
    }
  });
}
"use strict";

//节流:n秒内只运行一次，若在n秒内重复触发，只有一次生效
function throttleed(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var oldTime = Date.now();
  return function () {
    var context = this;
    var newTime = Date.now();

    if (newTime - oldTime > delay) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      fn.apply(context, args);
      oldTime = newTime;
    }
  };
}

function throttled1(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var timer = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var context = this;

    if (!timer) {
      //n秒内连续触发多次，只执行一次
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null; //只有执行完一次把timer设置为null，才能再次触发
      }, delay);
    }
  };
}
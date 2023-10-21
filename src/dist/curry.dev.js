"use strict";

//参数柯里化
var curry = function curry(fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.length < fn.length ? function () {
    for (var _len2 = arguments.length, _args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _args[_key2] = arguments[_key2];
    }

    return curry.apply(void 0, [fn].concat(args, _args));
  } : fn.apply(void 0, args);
};

function sum(a, b, c) {
  return a + b + c;
}

var curried = curry(sum);
console.log(curried(1)(2)(3)); // 6

console.log(curried(1, 2)(3)); // 6

var curry2 = function curry2(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
};
"use strict";

//实现maxRequest,成功后resolve结果，失败后重试，尝试超过一定次数才reject,同时超过10s自动失败
// 递归
function maxRequest(fn, maxNum) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      reject('error');
    }, 10000);

    if (maxNum === 0) {
      reject("max request number");
      clearTimeout(timer);
      return;
    }

    Promise.resolve(fn).then(function (value) {
      resolve(value);
      console.log(value);
      clearTimeout(timer);
    })["catch"](function () {
      return maxRequest(fn, maxNum - 1);
    });
  });
}

function getProm() {
  var n = Math.random();
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      return n > 0.9 ? resolve(n) : reject(n);
    }, 1000);
  });
}

maxRequest(getProm, 5); // 循环 async 实现

function maxRequest2(fn, maxNum) {
  return new Promise(function _callee(resolve, reject) {
    var timer, i, value;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timer = setTimeout(function () {
              reject('error');
            }, 10000);
            i = 0;

          case 2:
            if (!(i < maxNum)) {
              _context.next = 18;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(fn());

          case 6:
            value = _context.sent;
            resolve(value);
            clearTimeout(timer); // 在允许请求的次数内成功 则跳出循环

            return _context.abrupt("break", 18);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);

            if (i === maxNum - 1) {
              reject('error');
              clearTimeout(timer);
            } else {
              // 失败则被捕获，进入下一轮循环
              console.error(_context.t0);
            }

          case 15:
            i++;
            _context.next = 2;
            break;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 12]]);
  });
}

var fetchWithAutoRetry = function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise(function (resolve, reject) {
    var cnt = 0;

    var retry = function retry() {
      fetcher().then(function (data) {
        resolve(data);
      })["catch"](function (error) {
        if (cnt < maximumRetryCount) {
          cnt++;
          retry();
        } else {
          reject(error);
        }
      });
    };

    retry();
  });
};
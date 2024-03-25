"use strict";

/*
Promise.all会在任何一个Promise对象失败时立即中止，并返回第一个失败的原因
而Promise.allSettled会等待所有Promise对象执行完毕，并返回每个Promise对象的执行结果，无论成功与否
*/
// Promise.allSettled 的结果数组中可能包含以下两种格式的数据
// {status:"fulfilled", value:result} 对于成功的响应
// {status:"rejected", reason:error} 对于 error
Promise.myAllSettled = function (promises) {
  return new Promise(function (resolve, reject) {
    var cnt = 0;
    var res = [];
    var len = promises.length; // 数组为空返回空数据

    if (len === 0) {
      return resolve([]);
    }

    promises.forEach(function (p, i) {
      Promise.resolve(p).then(function (res) {
        cnt += 1;
        res[i] = {
          status: "fulfilled",
          value: res
        };

        if (len === cnt) {
          resolve(res);
        }
      })["catch"](function (err) {
        cnt += 1;
        res[i] = {
          status: "rejected",
          reason: err
        };

        if (cnt === len) {
          resolve(res);
        }
      });
    });
  });
}; // 使用finally


function PromiseAllSettled(promises) {
  return new Promise(function (resolve) {
    var res = [];
    var cnt = 0;
    promises.forEach(function (p, i) {
      Promise.resolve(p).then(function (data) {
        res[i] = {
          status: "fulfilled",
          value: data
        };
      })["catch"](function (err) {
        res[i] = {
          status: "rejected",
          reason: err
        };
      })["finally"](function () {
        cnt++;
        cnt === promises.length && resolve(res);
      });
    });
  });
}
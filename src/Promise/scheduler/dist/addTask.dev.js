"use strict";

var urls = ["1", "2", "3", "4", "5", "6", "7"];
var pool = []; //并发池

var max = 3; //最大并发数量
// 自定义请求函数

function request(url) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(url);
      console.log("\u4EFB\u52A1".concat(url, "\u5B8C\u6210"));
    }, 1000);
  }).then(function (res) {
    console.log("外部逻辑", res);
  });
} //非Promise.race()


function limitRequest(urls, max) {
  var pool = [];

  var addTask = function addTask(url) {
    var task = request(url);
    pool.push(task);
    task.then(function (res) {
      //请求结束将Promise任务从pool中移除
      pool.splice(pool.indexOf(task), 1);
      console.log("".concat(url, "\u7ED3\u675F\uFF0C\u5F53\u524D\u5E76\u53D1\u6570:").concat(pool.length));
      url = urls.shift(); //并发池跑完一个任务再塞入一个任务

      if (url !== undefined) {
        addTask(url);
      }
    });
  };

  while (pool.length < max) {
    var url = urls.shift();
    addTask(url);
  }
} //Promise.race()实现


function addTask(url) {
  var task = request(url);
  pool.push(task);
  task.then(function (res) {
    //请求结束将Promise任务从pool中移除
    pool.splice(pool.indexOf(task), 1);
    console.log("".concat(url, "\u7ED3\u675F\uFF0C\u5F53\u524D\u5E76\u53D1\u6570:").concat(pool.length));
  });
}

function run(task) {
  task.then(function (res) {
    var url = urls.shift();

    if (url !== undefined) {
      addTask(url);
      run(Promise.race(pool));
    }
  });
}

while (pool.length < max) {
  var url = urls.shift();
  addTask(url);
}

var race = Promise.race(pool);
run(race); //Promise+async...await

function fn() {
  var _loop, i;

  return regeneratorRuntime.async(function fn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _loop = function _loop(i) {
            var task;
            return regeneratorRuntime.async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    task = request(urls[i]); //请求结束将Promise任务从pool中移除

                    task.then(function (res) {
                      pool.splice(pool.indexOf(task), 1);
                      console.log("".concat(urls[i], "\u7ED3\u675F\uFF0C\u5F53\u524D\u5E76\u53D1\u6570:").concat(pool.length));
                    });
                    pool.push(task); //并发池塞满后需要等待一个task完成才可以继续往里面塞任务

                    if (!(pool.length === max)) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 6;
                    return regeneratorRuntime.awrap(Promise.race(pool));

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          i = 0;

        case 2:
          if (!(i < urls.length)) {
            _context2.next = 8;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(_loop(i));

        case 5:
          i++;
          _context2.next = 2;
          break;

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Promise.allSettled(pool));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}

fn();
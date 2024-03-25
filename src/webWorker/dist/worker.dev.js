"use strict";

self.onmessage = function (event) {
  var data = event.data; //后台执行任务

  var result = doSomeWork(data);
  self.postMessage(result);
};

function doSomeWork(data) {
  return data * 2;
}
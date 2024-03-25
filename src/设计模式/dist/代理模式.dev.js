"use strict";

var myImage = function () {
  var ImageNode = document.createElement('img');
  document.body.appendChild(ImageNode);
  return function (src) {
    ImageNode.src = src;
  };
}();

var proxyImage = function () {
  var img = new Image();

  img.onload = function () {
    myImage(this.src);
  };

  return function () {
    myImage('file://C:/Users/sevenaeng/Desktop/loading.jpg');
    img.src = src;
  };
}();

proxyImage('http://imgcache.qq.com/music/a.jpg'); //虚拟代理合并http请求

var synchronusFile = function synchronusFile(id) {
  console.log('开始同步文件,id为:' + id);
};

var proxySynchronousFile = function () {
  var cache = [],
      timer;
  return function () {
    cache.push(id);

    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      synchronusFile(cache.join(',')); //两秒内向本体发送需要同步的ID集合

      clearTimeout(timer);
      timer = null;
      cache.length = 0; //清空ID集合
    }, 2000);
  };
}();

var checkbox = document.getElementsByTagName('input');

for (var i = 0; c; c = checkbox[i++]) {
  c.onclick = function () {
    if (this.checked === true) {
      proxySynchronousFile(this.id);
    }
  };
} //缓存代理计算乘积


var mult = function mult() {
  var a = 1;

  for (var _i = 0; _i < arguments.length; _i++) {
    a = a * arguments[_i];
  }

  return a;
}; //缓存代理工厂


var createProxyFactory = function createProxyFactory(fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');

    if (args in cache) {
      return cache[args];
    }

    return cache[args] = fn.apply(this, arguments);
  };
};

var proxyMult = createProxyFactory(mult);
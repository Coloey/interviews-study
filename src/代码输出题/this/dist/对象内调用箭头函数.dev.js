"use strict";

var _this2 = void 0;

var obj = {
  say: function say() {
    var _this = this;

    var f1 = function f1() {
      console.log("1111", _this);
    };

    f1();
  },
  pro: {
    getPro: function getPro() {
      console.log(_this2);
    }
  }
};
var fn = obj.say;
fn();
obj.say();
obj.pro.getPro(); //1111 window{}
//1111 obj{}
//window{}

/*
fn()，fn是在全局执行的，而f1是箭头函数，它是没有绑定this的，它的this指向其父级的this，其父级say方法的this指向的是全局作用域，所以会打印出window；
obj.say()，谁调用say，say 的this就指向谁，所以此时this指向的是obj对象；
obj.pro.getPro()，我们知道，箭头函数时不绑定this的，getPro处于pro中，而对象不构成单独的作用域，所以箭头的函数的this就指向了全局作用域window。
*/

var a = 10;
var obj = {
  a: 20,
  say: function say() {
    console.log(_this2.a);
  }
};
obj.say();
var anotherObj = {
  a: 30
};
obj.say.apply(anotherObj); // 10  10

/*
箭头函数时不绑定this的，它的this来自原其父级所处的上下文，所以首先会打印全局中的 a 的值10。后面虽然让say方法指向了另外一个对象，但是仍不能改变箭头函数的特性，
它的this仍然是指向全局的，所以依旧会输出10。
*/
"use strict";

function a(xx) {
  this.x = xx;
  return this;
}

;
var x = a(5);
var y = a(6);
console.log(x.x); // undefined

console.log(y.x); // 6

/*
最关键的就是var x = a(5)，函数a是在全局作用域调用，所以函数内部的this指向window对象。所以 this.x = 5 就相当于：
window.x = 5。之后 return this，也就是说 var x = a(5) 中的x变量的值是window，这里的x将函数内部的x的值覆盖了。然后执行console.log(x.x)， 
也就是console.log(window.x)，而window对象中没有x属性，所以会输出undefined。
当指向y.x时，会给全局变量中的x赋值为6，所以会打印出6。
*/
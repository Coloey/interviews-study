function Super() {
  this.name = "hi";
}
Super.prototype.say = function () {
  console.log(this.name + "say hi");
};
function Sub() {
  this.age = 11;
}
Sub.prototype = new Super(); //核心
Sub.prototype.sleeping = function () {
  console.log(this.age);
};
let sub = new Sub();
sub.say();
/*
最常用
优点包括：
简单易用：只需将父类的实例赋值给子类的原型对象即可实现继承。
继承共享属性和方法：子类能够继承父类的共享属性和方法，节省内存空间。
可以在子类中扩展和重写父类的方法。
缺点：
在创建子类实例时无法向父类构造函数传参
子类直接是父类的实例 因此如果父类上有引用类型的属性 会被子类的所有实例共享
*/

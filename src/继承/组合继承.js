function Parent(name) {
  this.name = name;
}
Parent.prototype.sayHello = function () {
  console.log("Hello,I am" + this.name);
};
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = new Parent();
let child = new Child("child");
child.sayHello();
/*
优点：兼具构造函数继承和原型链继承的优点，可以继承父类构造函数的属性并且不共享引用类型的属性
缺点：调用两次父类构造函数，造成性能损失
*/

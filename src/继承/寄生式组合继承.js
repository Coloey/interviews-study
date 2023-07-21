function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.sayAge = function () {
  console.log("I'm " + this.age + " years old");
};

var child = new Child("Child", 10);
child.sayHello(); // Hello, I'm Child
child.sayAge(); // I'm 10 years old
/*
支持多继承：子类可以同时继承多个父类。
优点：避免组合继承中重复调用父类构造函数问题，组合继承会在子类原型对象上创建一个父类的实例，而寄生式组合继承只是将父类的原型对象赋值给子类的原型对象，避免了创建多余的实例。
继承了父类的实例属性和方法，同时也继承了父类的共享属性和方法。
缺点：

使用了寄生式继承，会创建实例对象，该实例的原型指向父类原型对象，并将其赋值给子类的原型对象，这样做会增加内存占用。
实现相对复杂，不够直观和简洁。
子类无法直接访问父类的私有属性。
*/

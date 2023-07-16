function Parent(name) {
  this.name = name;
  this.color = ["1", "2"];
}

Parent.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name);
};

function Child(name) {
  Parent.call(this, name);
}

var child1 = new Child("child1");
var child2 = new Child("child2");
child1.color.push("4");
console.log(child2.color);
console.log(child1, child2);

/*
优点：在子类构造函数中调用父类构造函数，并将this指向自身，可以向父类构造函数传参,并且this指向
自身 所以不会造成父类引用类型共享
缺点：无法继承父类原型上的方法

*/

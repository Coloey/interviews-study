function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name); //不能用箭头函数，因为箭头函数没有this绑定，会向上找到全局上下文
};
function SubType(name, age) {
  SuperType.call(this, name); //SuperType的构造函数绑定SubType的构造函数,调用Supertype()
  this.age = age;
}
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = Subtype;

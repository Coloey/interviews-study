function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
var parent = {
  name: "Parent",
  sayHello: function () {
    console.log("Hello, I'm " + this.name);
  },
};

var child = createObj(parent);
child.name = "Child";
child.sayHello(); // Hello, I'm Child
/*优点：

简单易用，可以快速创建对象。
缺点：
引用类型的属性会被所有实例共享。
*/

function createChild(obj) {
  let child = Object.create(obj);
  child.name = "child";
  return child;
}
let parent = {
  name: "parent",
  sayHello: function () {
    console.log("hello" + this.name);
  },
};
let child = createChild(parent);
child.sayHello(); // Hello, I'm Child
/*
优点：

简单易用，可以快速创建对象。 缺点：
引用类型的属性会被所有实例共享。
*/

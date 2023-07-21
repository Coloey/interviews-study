const objectFreeze = (object) => {
  for (key in object) {
    const type = object.prototype.toString.call(object[key]);
    if (type === "[Object object]" || type === "[Object array]") {
      objectFreeze(object[key]);
    } else {
      Object.defineProperty(object, key, {
        writable: false,
      });
    }
  }
  Object.seal(object);
};
/*
object.freeze:Object.freeze() 静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定。freeze() 返回与传入的对象相同的对象。

*/

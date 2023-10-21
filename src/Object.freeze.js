const objectFreeze = (object) => {
  for (key in object) {
    const type = object.prototype.toString.call(object[key]);
    if (type === "[object Object]" || type === "[object Array]") {
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
object.freeze:Object.freeze() 静态方法可以使一个对象被冻结。冻结对象可以防止扩展
，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，
不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也
不能被重新指定。freeze() 返回与传入的对象相同的对象。
Object.seal() 静态方法密封一个对象。密封一个对象会阻止其扩展并且使得现有属性不可配置
。密封对象有一组固定的属性：不能添加新属性、不能删除现有属性或更改其可枚举性和可配置
性、不能重新分配其原型。只要现有属性的值是可写的，它们仍然可以更改（freeze不可更改属性）。seal() 返
回传入的同一对象
*/

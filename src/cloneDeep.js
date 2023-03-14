//使用WeakMap只接受对象作为键名，WeakMap的键名指向的对象不计入垃圾回收机制，键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内，只要引用的对象的其他引用被删除，
//垃圾回收机制会自动释放该对象占用的内存,避免内存泄漏
function deepClone(obj, hash = new WeakMap()) {
  //使用哈希表解决循环检测，哈希表存储已经拷贝过的对象，当检测到对象已经存在于哈希表那直接返回该值
  if (obj === null || typeof obj !== "object") return obj; //不是对象，或者是null直接返回，你不用继续递归
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof HTMLElement) return obj; //处理DOM元素，拷贝DOM元素没有意义，都是指向页面中同一个
  if (hash.has(obj)) return hash.get(obj);
  const cloneObj = new obj.constructor(); //创建一个新的克隆对象或克隆数组，实例的constructor就是构造函数，因此在拷贝时不用去判断对象类型
  hash.set(obj, cloneObj); //如果存储空间没有就存进hash
  Reflect.ownKeys(obj).forEach((key) => {
    //Reflect.ownKeys返回一个由目标对象自身的属性组成的数组，返回值等价于object.getOwnPopertyNames(obj).concat(Object.getOwnPropertySymbols(obj))
    cloneObj[key] = deepClone(obj[key], hash); //递归拷贝每一层
  });
  return cloneObj;
}

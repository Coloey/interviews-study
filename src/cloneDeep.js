// 使用WeakMap只接受对象作为键名，WeakMap的键名指向的对象不计入垃圾回收机制，键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内，只要引用的对象的其他引用被删除，
// 垃圾回收机制会自动释放该对象占用的内存,避免内存泄漏
//JSON.parse(JSON.stringify()) lodash.cloneDeep()
function deepClone(obj, hash = new WeakMap()) {
  //使用哈希表解决循环检测，哈希表存储已经拷贝过的对象，当检测到对象已经存在于哈希表那直接返回该值
  if (obj === null || typeof obj !== "object") return obj; //不是对象，或者是null直接返回，你不用继续递归
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj);
  // 利用new obj.constructor()代替obj instanceof
  const cloneObj = new obj.constructor(); //创建一个新的克隆对象或克隆数组，实例的constructor就是构造函数，因此在拷贝时不用去判断对象类型
  /* 以前
  if (obj instanceof Array) {
    cloneObj = []
  } else {
       cloneObj= {}
     }*/
  hash.set(obj, cloneObj); //如果存储空间没有就存进hash
  Reflect.ownKeys(obj).forEach((key) => {
    //Reflect.ownKeys返回一个由目标对象自身的属性组成的数组，返回值等价于object.getOwnPopertyNames(obj).concat(Object.getOwnPropertySymbols(obj))
    cloneObj[key] = deepClone(obj[key], hash); //递归拷贝每一层
  });
  return cloneObj;
}
//JSON.parse(JSON.stringify()) JSON.parse(JSON.stringify(obj)) 原理就是利用 JSON.stringify 将 js 对象序列化（JSON字符串），再使用JSON.parse 来反序列化(还原)js 对象
//拷贝的对象中如果有函数，undefined， symbol，当使用过 JSON.stringify() 进行处理之后，都会消失
// 浅拷贝
function shallowClone(obj){
  let newObj={}
  for(let prop in obj){
    if(obj.hasOwnProperty(prop)){
      newObj.prop=obj.prop
    }
  }
  return newObj
}
//浅拷贝还包括Object.assign,Array.prototype.slice(),Array.prototype.concat()，扩展运算符
module.exports = deepClone;

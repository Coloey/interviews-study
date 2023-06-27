//手写call
Function.prototype._call = function (context = window) {
  //判断调用对象是都是个函数
  if (typeof this !== "function") {
    throw Error("this is not a function");
  }
  const fn = Symbol("thisobj");
  context[fn] = this; //context对象内部有个fn方法,this指向的是该函数,后面直接调用该函数，并且删除属性
  // call参数不是数组
  const args = [...arguments].slice(1);
  let res = context[fn](...args);
  delete context[fn];
  return res;
};

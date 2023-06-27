function Myapply(context = window) {
  if (typeof this !== "function") {
    throw new Error("this is not a function");
  }
  const fn = Symbol("thisobj");
  context[fn] = this;
  let res = null;
  // 参数是数组
  if (arguments[1]) {
    res = context[fn](...arguments[1]);
  } else {
    res = context[fn]();
  }
  delete context[fn];
  return res;
}

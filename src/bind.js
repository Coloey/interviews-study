//手写bind
Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw Error("this is not a function");
  }
  const self = this;
  //将args转为数组,第一个参数是绑定的this
  const args = [...arguments].slice(1);
  return function () {
    //self.apply(context, args.concat(...arguments));
    // 不用apply
    context.fn = self;
    context.fn(args.concat(...arguments))
    delete context.fn;
  };
};
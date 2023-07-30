/*
把一个异步请求的函数，封装成一个可以具有 then方法的函数，并且在then方法中返回异步方法执行结果的这么一个函数

具有 then 方法
then 方法里返回异步接口执行结果
 */
function asyncFn(a, b, callback) {
  console.log("异步请求", a, b);
  setTimeout(function () {
    callback("异步请求结果");
  }, 3000);
}
const proxy = promisify(asyncFn);
proxy(11, 22).then((res) => {
  console.log(res);
});
// 针对异步方法做封装，所以需要返回一个函数
function promisify(asyncFn) {
  // 内部需要调用asyncFn,并传递原始参数，所以需要返回一个方法来接收参数
  return function (...args) {
    // 我们需要执行异步操作，并返回一个结果，所以返回一个 promise实例
    return new Promise((resolve) => {
      // asyncFn 需要执行一个回调，所以定义一个回调方法
      const callback = function (...args) {
        resolve(args);
      };
      args.push(callback);
      asyncFn.apply(null, args);
    });
  };
}

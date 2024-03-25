//把一个异步请求的函数，封装成一个可以具有then方法的函数，并且在then方法中返回异步方法执行结果的一个函数

//1 具有then方法 2 then方法里返回异步接口执行结果
function asyncFn(a, b, cb) {
  console.log("arguments", a, b);
  setTimeout(function () {
    cb("异步请求结果");
  }, 3000);
}
const proxy = promisify(asyncFn);
proxy(11, 22).then((res) => {
  console.log(res);
});

function promisify(asyncFn) {
  return function (...args) {
    return new Promise((resolve) => {
      // asyncFn执行一个回调，定义一个回调方法
      const cb = function (...args) {
        resolve(args);
      };
      args.push(cb);
      asyncFn.apply(null, args);
    });
  };
}

function promisify2(asyncFn) {
  return function (...args) {
    return new Promise((resolve) => {
      asyncFn(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })
  }
}
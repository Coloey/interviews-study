// 接收若干个函数作为参数，每个参数执行后的输出作为下一个函数的输入
// 执行方向自右向左，初始函数的参数在最右边
function compose(...fns) {
  return function (x) {
    return fns.reverse().reduce((arg, fn) => {
      return fn(arg);
    }, x);
  };
}
const add = (x) => x + 1;
const multiply = (x) => x * 2;
const minus = (x) => x - 1;

console.log(compose(minus, multiply, add)(1)); // 3
//参数柯里化
const curry = (fn, ...args) => {
  return args.length < fn.length
    ? (..._args) => curry(fn, ...args, ..._args)
    : fn(...args);
};
function sum(a, b, c) {
  return a + b + c;
}

const curried = curry(sum);
console.log(curried(1)(2)(3)); // 6
console.log(curried(1, 2)(3)); // 6

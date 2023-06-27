let x = 3;
function fn(x) {
  return function (y) {
    console.log(y + ++x);
  };
}
let f = fn(4)(5);

console.log(x); // 10 3

//间隔输出123
const arr = [1, 2, 3];
arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(console.log(x)), 1000)
    );
  });
}, Promise.resolve());
// // 闭包
// for (var i = 0; i < arr.length; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(arr[i]);
//     }, 1000 * i);
//   })(i);
// }
const task = [];
const output = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i);
      resolve();
    }, 1000 * i);
  });
};
for (let i = 0; i < arr.length; i++) {
  task.push(output(arr[i]));
}
async function test() {
  for (let i = 0; i < task.length; i++) {
    await task[i];
  }
}
test();

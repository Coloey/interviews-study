/*async function foo() {
  console.log(1);
  let a = await 100;
  console.log(a);
  console.log(2);
}
console.log(0);
foo();
console.log(3);*/
console.log(1);
async function async1() {
  console.log("async 1");
  await async2(); //这里默认是Promise.resolve了 除非是执行Promise,且没有resolve才会阻塞后面
  console.log(3);
}
async function async2() {
  console.log("async 2");
}
new Promise((resolve, reject) => {
  console.log(4);
  resolve();
}).then(() => {
  console.log(7);
});
async1();
console.log(8);
// 对比
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
/*script start
async1 start
promise1
script end*/
//这里需要注意的是在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，
//所以在await之后的内容是不会执行的，包括async1后面的 .then。

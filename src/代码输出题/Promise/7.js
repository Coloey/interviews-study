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
  await console.log(2);
  console.log(3);
}
new Promise((resolve, reject) => {
  console.log(4);
  resolve();
}).then(() => {
  console.log(7);
});
async1();
console.log(8);

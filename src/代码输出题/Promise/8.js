async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise1");
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
//变形：
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise1");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
/*srcipt start
async1 start
promise1
srcipt end
async1 success
async1 end*/

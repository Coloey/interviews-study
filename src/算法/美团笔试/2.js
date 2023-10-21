//实例化
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async function () {
  let num = await readline();
  let distance = (await readline()).split(" ").map((item) => parseInt(item));
  let temp = (await readline()).split(" ").map((item) => parseInt(item));
  let start = temp[0];
  let end = temp[1];
  let sum = 0;
  for (let i = start - 1; i < end - 1; i++) {
    sum += distance[i];
  }

  let sum2 = 0;
  for (let i = start - 2; i >= 0; i--) {
    sum2 += distance[i];
  }
  for (let i = end - 1; i < num - 1; i++) {
    sum2 += distance[i];
  }
  sum2 += distance[num - 1];
  console.log(Math.min(sum, sum2));
})();

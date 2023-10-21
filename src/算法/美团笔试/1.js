//实例化
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async function () {
  let pages, day;
  const tokens = (await readline()).split(" ");
  pages = tokens[0];
  day = tokens[1];
  let array = [];
  for (let i = 0; i < day; i++) {
    let line = await readline();
    let temp = line.split(" ").map((item) => parseInt(item));
    array.push(temp);
  }
  let hash = [];
  const res = [];
  for (let [l, r] of array) {
    let cnt = 0;
    for (let i = l; i <= r; i++) {
      if (!hash.includes(i) && i <= pages) {
        hash.push(i);
        cnt++;
      }
    }
    res.push(cnt);
  }
  res.forEach((item) => {
    console.log(item);
  });
})();
-infinity
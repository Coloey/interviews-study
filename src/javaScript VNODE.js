const readline = require("readline");
//实例化
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 单行输入 单行输出
rl.on("line", function (line) {
  const tokens = line.split(" ");
  //数组
  // const tokens = line.slice(1,line.length-1).split(',');
  console.log(parseInt(tokens[0]), parseInt(tokens[1]));
});
// 多行输入
rl.on("line", function (line) {
  inputArr.push(line.split(" "));
}).on("close", function () {
  console.log(fun(inputArr));
});
function fun() {
  return;
}

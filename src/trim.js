// 使用正则
// function myTrim(str) {
//     return str.replace(/^\s+|\s+$/g, '');
// }
//不使用正则
function myTrim(str) {
  let head = 0,
    foot = str.length - 1;
  while (head < str.length) {
    if (str[head] === " ") {
      head++;
    } else {
      break;
    }
  }
  while (foot >= 0) {
    if (str[foot] === " ") {
      foot--;
    } else {
      break;
    }
  }
  return str.substr(head, foot - head + 1);
}
console.log(myTrim("  aaab   ").length);

/*
当第二个参数为函数时，参数：
arguments[0]:匹配到的子字符串
arguments[1]:匹配到的第一个分组项
arguments[2]:匹配到的第二个分组项...
最后两个参数分别是匹配到的字符串的索引位置和源字符串本身
*/
/*function cssStyle2DomStyle() {
  let str = "john_mith_12";
  let reg = /(\_)(\w)/g;
  let res = str.replace(reg, function (match, underline, letter, i) {
    //console.log(match, underline, letter);// _m, _, m  _1, _, 1
    return i === 0 ? letter : letter.toUpperCase();
  });
  console.log(res);
}

//方法二：
function cssStyle2DomStyle(sName) {
  sName = sName.split("_");
  //第一个就是带_,清除空格
  if (sName[0] === "") {
    sName.shift();
  }
  let res = sName[0];
  for (let i = 1; i < sName.length; i++) {
    res += sName[i][0].toUpperCase() + sName[i].slice(1);
  }
  return res;
}*/
const underline2Camel = (str) => {
  str.replace(/_(\w)/g, (p1, p2) => p2.toUpperCase());
  return str;
};
const camel2underline = (str) => {
  str.replace(/[A-Z]/g, (p1) => `_${p1.toLowerCase()}`);
  if (str.slice(0, 1) === "_") {
    str = str.slice(1);
  }
  return str;
};
console.log(underline2Camel("hello_world"));
console.log(camel2underline("helloWorldMyFriend"));

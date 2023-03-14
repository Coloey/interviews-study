/*
当第二个参数为函数时，参数：
arguments[0]:匹配到的子字符串
arguments[1]:匹配到的第一个分组项
arguments[2]:匹配到的第二个分组项...
最后两个参数分别是匹配到的字符串的索引位置和源字符串本身
*/
function cssStyle2DomStyle() {
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
  sName = sName.split("-");
  if (sName[0] === "") {
    sName.shift();
  }
  let res = sName[0];
  for (let i = 1; i < sName.length; i++) {
    res += sName[i][0].toUpperCase() + sName[i].slice(1);
  }
  return res;
}

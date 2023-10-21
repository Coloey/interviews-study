"use strict";

//tips:Number.toString(param)中param可以为2到32之间的数，即把数字转为该进制的数
//RegExp.prototype.test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配

/*String.prototype.match()方法检索字符串与正则表达式进行匹配的结果。
String.prototype.match 方法本身的实现非常简单，它只是使用字符串作为第一个参数调用了参数的 Symbol.match 方法。实际的实现来自于 RegExp.prototype[@@match]()。
返回值
一个 Array，其内容取决于是否存在全局（g）标志，如果没有匹配，则返回 null。
如果使用 g 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
如果没有使用 g 标志，则只返回第一个完整匹配及其相关捕获组。在这种情况下，match() 方法将返回与 RegExp.prototype.exec() 相同的结果（一个带有一些额外属性的数组）。
具体查看mdnhttps://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B
*/
//方法一：
function rgb2hex(sRGB) {
  // 填写JavaScript
  var reg = /^rgb\((\d+),(\d+),(\d+)\)$/;
  var matches = sRGB.match(reg);
  var hex;

  if (matches) {
    var red = parseInt(matches[1]);
    var green = parseInt(matches[2]);
    var blue = parseInt(matches[3]);
    hex = "#" + (red << 16 | green << 8 | blue).toString(16).padStart(6, "0");
  }

  return hex;
} //方法二:


function rgb2hex2(sRGB) {
  var reg = /^rgb\((\d+),(\d+),(\d+)\)$/;
  if (!reg.test(sRGB)) return sRGB;
  var rgb = sRGB.split("(")[1].split(")")[0].split(",");
  var res = "";

  for (var i = 0; i < 3; i++) {
    var _char = rgb[i].trim();

    res += parseInt(_char).toString(16);
  }

  return "#" + res.padStart(6, "0");
}

console.log(rgb2hex("rgb(1,1,1)"));
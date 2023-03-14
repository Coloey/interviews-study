Array.prototype.myJoin = function (connector = ",") {
  let arr = this;
  let str = "";
  for (let item of arr) {
    //undefined和null都会转为''
    item = typeof item === "undefined" || item === "null" ? "" : item;
    str += item.toString() + connector;
  }
  //最后一个不应该加连续符,减去一个连续符的长度
  return str.slice(0, str.length - connector.length);
};

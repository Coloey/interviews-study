function MyObjectCreate(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
// 或者
function myCreate(obj) {
  let value = {};
  value.__proto__ = obj;
  return value;
}

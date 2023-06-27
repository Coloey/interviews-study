function A() {}
const a = new A();
console.log(a.constructor); // [Function: A]
console.log(a.prototype); // undefined
console.log(a.__proto__); // {}
console.log(A.prototype.constructor); // [Function: A]

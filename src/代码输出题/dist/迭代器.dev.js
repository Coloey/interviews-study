"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//写一个类，有一个this.z=[1,2,3,4,5] 有一个方法sayHello，要求obj.sayHello调用一次打印1，再调用一次打印2..
var Hello =
/*#__PURE__*/
function () {
  function Hello() {
    _classCallCheck(this, Hello);

    this.z = [1, 2, 3, 4, 5];
    this.idx = 0;
  }

  _createClass(Hello, [{
    key: "sayHello",
    value: function sayHello() {
      if (this.idx < this.z.length) {
        console.log(this.z[this.idx++]);
      } else {
        console.log(undefined);
      }
    }
  }]);

  return Hello;
}();

var obj = new Hello();
obj.sayHello();
obj.sayHello();
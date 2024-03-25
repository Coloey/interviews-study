"use strict";

function StorageBase() {}

StorageBase.prototype.getItem = function (key) {
  return localStorage.getItem(key);
};

StorageBase.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value);
};

var Storage = function () {
  var instance = null;
  return function () {
    if (!instance) {
      instance = new StorageBase();
    }

    return instance;
  };
}();

var storage1 = new Storage();
var storage2 = new Storage(); // true

console.log(storage1 === storage2);
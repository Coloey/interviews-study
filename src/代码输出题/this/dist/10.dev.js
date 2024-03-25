"use strict";

function fn() {}

;
console.log(fn());

function fn2() {
  setTimeout(function () {
    console.log(this);
  }, 1000);
}

fn2();
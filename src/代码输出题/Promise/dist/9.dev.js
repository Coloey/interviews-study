"use strict";

//Promise嵌套
new Promise(function (resolve) {
  console.log('Promise1');
  resolve();
}).then(function () {
  console.log('then11');
  new Promise(function (resolve) {
    console.log('Promise2');
    resolve();
  }).then(function () {
    console.log('then21');
  }).then(function () {
    console.log('then23');
  });
}).then(function () {
  console.log('then12');
});
/*
第一个then resolve后then21和then12都进入微任务队列
  Promise1
  then11
  Promise2
  then21
  then12
  then23
*/
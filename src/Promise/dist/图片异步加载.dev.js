"use strict";

function loadImg(src) {
  return new Promise(function (resolve, reject) {
    var img = new Image();

    if (!img.complete) {
      img.onload = function () {
        console.log("图片加载成功");
        resolve(img);
      };

      img.error = function () {
        reject(new Error("Can not load ".concat(src)));
      };
    } else {
      resolve();
    }

    img.src = src;
  });
}

function timeout() {
  return new Promise(function (reject) {
    setTimeout(function () {
      reject("超时");
    }, 3000);
  });
} //判断图片加载是否超时


Promise.race([loadImg, timeout]).then(function (data) {
  console.log(data);
})["catch"](function (err) {
  console.log(err);
});
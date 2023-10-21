Array.prototype.forEach = function (fn, thisValue) {
  let index = 0;
  let arr = thisValue || this;
  if (typeof fn !== "function") {
    throw new TypeError(fn + "is not a function");
  }
  while (index < arr.length) {
    if (index in arr) {
      //forEach传入回调函数在这里执行，因此无法在回调函数中用continue或者break跳出循环 return 可以终止cb的作用，但是会结束单签迭代，进入下一个循环
      fn.call(thisValue, arr[index], index, arr);
    }
    index++;
  }
};
function fn(currValue, index, arr) {
  console.log(currentValue);
  // break & continue 当然不会工作
  // 因为 cb 都不在循环体内

  // return 只会起到中止 cb 的作用
  // 所以对于 forEach 来说，它会结束当前迭代，进入下一个循环
  return;
}
/*使用 cb，for循环 也会报错
在 for循环 内写回调函数的效果也是一样的：
*/
const arr = [1, 2, 3, 4, 5];

function cb(currentValue, index, array) {
  console.log(currentValue);
  // 这里用 break/continue 同样会报错

  // return 提前终止函数，不会进行其他的操作
  // 相当于直接在 for循环 内使用 continue
  if (index >= 3) {
    return;
  }
  console.log("永远<3", index);
}

for (let i = 0; i < arr.length; i++) {
  cb(arr[i], i);
}

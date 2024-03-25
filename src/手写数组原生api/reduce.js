// callbackfn 被调用时会传入四个参数：

// previousValue（前一次调用 callbackfn 得到的返回值）
// currentValue（数组中正在处理的元素）
// currentIndex（数组中正在处理的元素的索引）
// 被遍历的对象
Array.prototype.myReduce = function (callback, initValue) {
  if (typeof callback !== "function") {
    throw new Error(`${callback} is not a function`);
  }
  let arr = this;
  let preValue = initValue;
  let index = 0,
    len = arr.length;
  if (!preValue) {
    //空属性不能作为初始值，去掉空属性
    while (index < len && !(index in arr)) {
      index++;
    }
    if (index >= len) {
      throw new Error("Reduce of empty array with no initial value");
    }
    //将第一个有效数组元素作为第一个元素
    preValue = arr[index++];
  }
  while (index < len) {
    preValue = callback(preValue, arr[index], index, arr);
    index++;
  }
  return preValue;
};
//
function reduce(fn, initValue) {
  if (typeof fn !== "function") {
    throw Error("it is not a function");
  }
  const arr = this;
  let acc;
  let initIndex;
  // 如果没有存入初始值，initval为数组第一项
  initIndex = arguments.length === 1 ? 1 : 0;
  // 没有传入初始值 累加器为数组第一位元素
  acc = arguments.length === 1 ? arr[0] : initValue;
  for (let i = initIndex; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr);
  }
  return acc
}
//test
const res = arr._reduce((pre, cur) => {
  return pre + cur;
}, 0);

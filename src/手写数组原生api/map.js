function myMap(fn, thisArg) {
  if (typeof fn !== "function") {
    throw new Error("the first argument must be a function");
  }
  let res = [];
  let currArr = this;
  for (let i = 0; i < currArr.length; i++) {
    // 传递给回调函数的值有currArr[i]：正在遍历的元素，i:元素的索引,currArr:数组本身
    res[i] = fn.call(thisArg, currArr[i], i, currArr);
  }
  return res;
}

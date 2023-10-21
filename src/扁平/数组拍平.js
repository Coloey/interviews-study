var flatten = function (arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
};

//循环实现
function flatten(arr) {
  while (arr.some((i) => Array.isArray(i))) {
    //展开运算符
    arr = [].concat(...arr);
  }
  return arr;
}
//方法二：使用reduce
function flat(arr) {
  return arr.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr) ? flat(curr) : curr);
  }, []);
}
//正则
const res = JSON.stringify(arr).replace(/\[|\])/g, "");
const res2 = JSON.parse("[" + res + "]");
//使用es6的flat
arr.flat(Infinity);

// yiled* 取出嵌套数组所有成员
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}
// 数组拍平指定层数1
function flatten1(arr, num) {
  while (arr.some((curr) => Array.isArray(curr)) && n > 0) {
    arr = [].concat(...arr);
    n--;
  }
  return arr;
}
//数组拍平指定层数2
function flatten2(arr, num) {
  return num > 0
    ? arr.reduce((acc, curr) => {
        return acc.concat(Array.isArray(curr) ? flatten2(curr, num - 1) : curr);
      }, [])
    : arr.slice();
}
// split和toString,toString会把数转为逗号分隔的字符串，再用split方法转为数组
function flatten(arr) {
  return arr.toString().split(",");
}
flatten([1, [2, [3, 4]]]);

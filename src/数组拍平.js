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

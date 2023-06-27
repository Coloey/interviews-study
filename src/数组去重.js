// 1 NAN和undefined有效，因为NAN和undefined可以被存储到set中，NAN!==NAN
const res = Array.from(new Set(arr));
// 2 循环 对NAN无效
function removeDuplicate(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--; // 减少循环次数提高性能
        j--; //保证j的值自加后不变
      }
    }
  }
  return arr;
}
// indexOf 无法对NAN去重 includes实现可以对NAN去重
function remove(arr) {
  let newArr = [];
  arr.forEach((item) => {
    if (newArr.indexOf(item) === -1) {
      newArr.push(item);
    }
  });
  return newArr;
}
//filter+indexOf
function removeByFilter(arr) {
  return arr.filter((item, index) => {
    // 返回数组中第一次出现给定元素的下标，如果不存在则返回 -1 重复元素只留下第一个
    return arr.indexOf(item) === index;
  });
}
let res = removeByFilter(arr);
//
function removeDuplicate(arr) {
  const map = new Map();
  const newArr = [];

  arr.forEach((item) => {
    if (!map.has(item)) {
      // has()用于判断map是否包为item的属性值
      map.set(item, true); // 使用set()将item设置到map中，并设置其属性值为true
      newArr.push(item);
    }
  });

  return newArr;
}

const result = removeDuplicate(arr);
console.log(result); // [ 1, 2, 'abc', true, false, undefined, NaN ]

//
function removeDuplicate(arr) {
  const newArr = [];
  const obj = {};

  arr.forEach((item) => {
    if (!obj[item]) {
      newArr.push(item);
      obj[item] = true;
    }
  });
  return newArr;
}

const result = removeDuplicate(arr);
console.log(result); // [ 1, 2, 'abc', true, false, undefined, NaN ]

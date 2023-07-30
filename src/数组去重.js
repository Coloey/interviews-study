// 1 NAN和undefined有效，因为NAN和undefined可以被存储到set中，NAN!==NAN
// const res = Array.from(new Set(arr));
// // 2 循环 对NAN无效
// function removeDuplicate(arr) {
//   let len = arr.length;
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1);
//         len--; // 减少循环次数提高性能
//         j--; //保证j的值自加后不变
//       }
//     }
//   }
//   return arr;
// }
// // indexOf 无法对NAN去重 includes实现可以对NAN去重
// function remove(arr) {
//   let newArr = [];
//   arr.forEach((item) => {
//     if (newArr.indexOf(item) === -1) {
//       newArr.push(item);
//     }
//   });
//   return newArr;
// }
// //filter+indexOf
// function removeByFilter(arr) {
//   return arr.filter((item, index) => {
//     // 返回数组中第一次出现给定元素的下标，如果不存在则返回 -1 重复元素只留下第一个
//     return arr.indexOf(item) === index;
//   });
// }
// let res = removeByFilter(arr);
// //
// function removeDuplicate(arr) {
//   const map = new Map();
//   const newArr = [];

//   arr.forEach((item) => {
//     if (!map.has(item)) {
//       // has()用于判断map是否包为item的属性值
//       map.set(item, true); // 使用set()将item设置到map中，并设置其属性值为true
//       newArr.push(item);
//     }
//   });

//   return newArr;
// }

// const result = removeDuplicate(arr);
// console.log(result); // [ 1, 2, 'abc', true, false, undefined, NaN ]

// //
// function removeDuplicate(arr) {
//   const newArr = [];
//   const obj = {};

//   arr.forEach((item) => {
//     if (!obj[item]) {
//       newArr.push(item);
//       obj[item] = true;
//     }
//   });
//   return newArr;
// }

// const result = removeDuplicate(arr);
// console.log(result); // [ 1, 2, 'abc', true, false, undefined, NaN ]
// // 数组根据key去重
// /*
// const dedup = (data, getKey = () => {} ) => {
//   // todo
// }*/
// let data = [
//   { id: 1, v: 1 },
//   { id: 2, v: 2 },
//   { id: 1, v: 1 },
// ];
// // 以 id 作为排重 key，执行函数得到结果
// // data = [
// //   { id: 1, v: 1 },
// //   { id: 2, v: 2 },
// // ];

// const dedup = (data, getKey = () => {}) => {
//   const dateMap = data.reduce((pre, curr) => {
//     const key = getKey(curr);
//     // 以key作为键值
//     if (!pre[key]) {
//       pre[key] = curr;
//       // pre={1:{id:1,v:1}}
//     }
//     return pre;
//   }, {});
//   return Object.values(dateMap);
// };
// console.log(dedup(data, (item) => item.id));
let arr = [
  { a: 1, b: 1 },
  { a: 1, b: 1 },
  { a: 1, b: 1 },
];
const dedup2 = (arr) => {
  const isEqual = (obj1, obj2) => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (let key in obj1) {
      if (!obj2[key] || obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (isEqual(arr[i], arr[j])) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
};
console.log(dedup2(arr));

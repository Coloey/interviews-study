// let user = {
//   name: "xxx",
//   address: {
//     cities: [{ city: "hanzhou1" }],
//   },
// };
// const str = "address.cities[0].city";
const get = (obj, path, defaultValue) => {
  let res = obj,
    i = 0;
  // 将[和]转为.,比如a[3].b -> a.3.b，$1表示正则表达式中第一个捕获分组的内容
  // 在这里 代表原来的数字
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  console.log(paths, "--");
  while (i < paths.length) {
    res = Object(res)[paths[i]];
    if (res === undefined) {
      return defaultValue;
    }
    i++;
  }
  return res;
};
console.log(get(user, str), "--");

// 不知道嵌套多深 用递归
// function findId(obj, id) {
//   let res = null;
//   if (obj[id]) {
//     res = obj[id];
//   } else {
//     if (typeof obj[id] === "object") {
//       res = findId(obj[id], id);
//     }
//   }
//   return res;
// }

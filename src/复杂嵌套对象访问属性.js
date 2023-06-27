// let user = {
//   name: "xxx",
//   address: {
//     cities: [{ city: "hanzhou1" }],
//   },
// };
// const str = "address.cities[0].city";
// const get = (obj, path, defaultValue) => {
//   let res = obj,
//     i = 0;
//   const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
//   console.log(paths, "--");
//   while (i < paths.length) {
//     res = Object(res)[paths[i]];
//     if (res === undefined) {
//       return defaultValue;
//     }
//     i++;
//   }
//   return res;
// };
// console.log(get(user, str), "--");

// 不知道嵌套多深 用递归
function findId(obj, id) {
  let res = null;
  if (obj[id]) {
    res = obj[id];
  } else {
    if (typeof obj[id] === "object") {
      res = findId(obj[id], id);
    }
  }
  return res;
}

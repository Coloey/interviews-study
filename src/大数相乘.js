/*
1.从后往前遍历str1和str2,两两相乘并且每个位置时累加的，相乘后的索引为i+j
2. 从后往前遍历res,res[index-1]=res[index-1]+res[index]/10;res[index]%=10
*/
function multiply(str1, str2) {
  if (str1 === "0" || str2 === "0") return "0";
  let res = [];
  let i = str1.length - 1,
    j = str2.length - 1;
  for (; i >= 0; i--) {
    let n1 = str1[i] - "0";
    for (j = str2.length - 1; j >= 0; j--) {
      let n2 = str2[j] - "0";
      res[i + j] = res[i + j] || 0;
      res[i + j] += n1 * n2;
    }
  }
  let len = res.length;
  for (let index = len - 1; index > 0; index--) {
    res[index - 1] += parseInt(res[index] / 10);
    res[index] %= 10;
  }
  return res.join("");
}
console.log(multiply("11", "99"));

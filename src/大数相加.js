function add(str1, str2) {
  //先获取两个数中最大长度
  let maxLength = Math.max(str1.length, str2.length);
  //用0补齐长度，让它们长度相同
  str2.length === maxLength
    ? (str1 = str1.padStart(maxLength, 0))
    : (str2 = str2.padStart(maxLength, 0));
  //进位标志位
  let flag = 0;
  let res = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    let temp = parseInt(str1[i]) + parseInt(str2[i]) + flag;
    //获取下一个进位
    flag = Math.floor(temp / 10);
    res = (temp % 10) + res;
  }

  //如果遍历完后，flag为1,说明还需要进一个位
  if (flag === 1) {
    res = "1" + res;
  }
  return res;
}
console.log(add("9999999999999999", "1"));

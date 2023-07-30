// 无小数版本
const thousandSeparator = function (n) {
  n = n.toString();
  const arr = [];
  let count = 0;
  for (let i = n.length - 1; i >= 0; i--) {
    count++;
    if (count < 4) {
      arr.unshift(n[i]);
    } else {
      arr.unshift(...[n[i], "."]);
      count = 1;
    }
  }
  return arr.join("");
};
console.log(thousandSeparator(1112345));
// 有小数版本
const format = (n) => {
  n = n.toString();
  const arr = [];
  let intPart = "";
  let decimals = "";
  let cnt = 0;
  if (n.indexOf(".") !== -1) {
    let num = n.split(".");
    intPart = num[0];
    decimals = num[1];
  }
  for (let i = intPart.length - 1; i >= 0; i--) {
    cnt++;
    if (cnt < 4) {
      arr.push(intPart[i]);
    } else {
      arr.push(...[".", intPart[i]]);
      cnt = 1;
    }
  }
  return decimals.length === 0
    ? arr.reverse().join("")
    : arr.reverse().join("") + "." + decimals;
};
console.log(format(12345678.1234));

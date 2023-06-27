let arr = [1, 2, 3, 4, 5, 6, 7];
Array.prototype.chunk = (size) => {
  // 如果是空数组 直接返回
  if (this.length === 0) {
    return this;
  }
  size = size > 1 ? (size > this.length ? this.length : size) : 1;
  let temp = [],
    res = [];
  arr.forEach((item) => {
    temp.push(item);
    if (item.length === size) {
      res.push(temp);
      temp = [];
    }
  });
  if (temp.length > 0) {
    res.push(temp);
  }
  return res;
};

const chunk = (size) => {
  if (arr.length === 0) {
    return arr;
  }
  size = size > 1 ? (size > arr.length ? arr.length : size) : 1;
  let res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};
console.log(chunk(2));

const change = (str) => {
  return str.split(",").reverse().join("#");
};
console.log(change("a,b,c,d,e,f,g"));

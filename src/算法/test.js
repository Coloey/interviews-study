//new
const Mynew = (fn, ...args) => {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.call(obj, ...args);
  return typeof res === "object" ? res : obj;
};
// create
const create = (obj) => {
  function Foo() {}
  Foo.prototype = obj;
  return new Foo();
};
// 寄生式组合继承
function SuperType() {}
function SubType() {
  SuperType.call(this);
}
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;
//去重
const filterArray = (arr) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
};
const filterArray2 = (arr) => {
  let newArr = [];
  arr.forEach((item) => {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  });
  return newArr;
};
// flat
const flatArr = (arr) => {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};
//instanceOf
const myInstanceOf = (left, right) => {
  while (left) {
    if (left.__proto__ === right) {
      return true;
    }
    left = left.__proto__;
  }
};
// 大数相加
const addBig = (num1, num2) => {
  let len = Math.max(num1.length, num2.length);
  if (num1.length > num2.length) {
    num2 = num2.padStart(len, 0);
  } else {
    num1 = num1.padStart(len, 0);
  }
  let flag = 0;
  let res = "";
  for (let i = len - 1; i >= 0; i--) {
    let temp = parseInt(num1[i]) + parseInt(num2[i]) + flag;
    //
    flag = Math.floor(temp / 10);
    res = (temp % 10) + res; // 计算好的放前面
  }
  if (flag === 1) {
    res = "1" + res;
  }
  return res;
};
// shuffle
const shuffle = (arr) => {
  let len = arr.length - 1;
  while (len > 0) {
    let index = Math.floor(Math.random() * (len - 1));
    [arr[index], arr[len]] = [arr[len], arr[index]];
    len--;
  }
  return arr;
};
//取两个数之间的随机值
Math.floor(Math.random() * (max - min)) + min;
//Promise队列
class Queue {
  constructor() {
    this.taskList = [];
  }
  task(fn, time) {
    this.taskList.push(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          fn;
          resolve();
        }, time);
      });
    });
  }
  async run() {
    for (let i = 0; i < this.taskList.length; i++) {
      await this.taskList[i]();
    }
  }
}
// Promise

// twoSum
const twoSum = (nums, target) => {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      res = [i, map.get(target - nums[i])];
      return res;
    }
    map.set(nums[i], i);
  }
  return res;
};
//threeSum
const threeSum = (nums) => {
  nums.sort((a, b) => a - b);
  let n = nums.length - 1;
  let i = 0;
  let res = [];
  while (i <= n) {
    //去重a
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1,
      right = n;
    while (right > left) {
      if (nums[i] + nums[left] + nums[right] > target) {
        right--;
      } else if (nums[i] + nums[left] + nums[right] < target) {
        left++;
      } else {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
      }
    }
    i++;
  }
  return res;
};
//LRU
class LRU {
  constructor(m) {
    this.map = new Map();
    this.max = m;
  }
  get(key) {
    if (this.map.has(key)) {
      let val = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, val);
      return val;
    } else {
      return -1;
    }
  }
  set(key, val) {
    if (this.map.has(key)) {
      this.map.delete(key);
      this.map.set(key, value);
      return;
    }
    if (this.map.size >= this.max) {
      this.map.delete; //(this.map.keys().next());
    }
    this.map.set(key, val);
  }
}
// compareVersion
//flat
Array.prototype.flat = function (n) {
  let arr = this;
  while (arr.some((item) => Array.isArray(item)) && n > 0) {
    arr = [].concat(...arr); //全部拍平一层
    n--;
  }
  return arr;
};

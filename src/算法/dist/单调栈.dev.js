"use strict";

/*
下一个更大元素
输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
*/
var nextMax = function nextMax(nums1, nums2) {
  // 根据nums2元素在nums1中找到对应索引
  var map = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nums2[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var x = _step.value;

      var _i = nums1.indexOf(x);

      if (_i) {
        map.set(x, _i);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var st = [];
  var res = new Array(nums.length).fill(-1);

  for (var i = 0; i < nums2.length; i++) {
    while (st.length && st[st.length - 1] < nums2[i]) {
      var num = st.pop(); //栈顶元素小于当前元素 则当前元素为栈顶元素的下一个最大值

      if (map.has(num)) res[map.get(num)] = nums2[i];
    }

    st.push(nums2[i]);
  }

  return res;
}; // 下一个更大元素II


var nextMax2 = function nextMax2(nums) {
  var n = nums.length;
  var res = new Array(n).fill(-1); // 记录nums中每个数字的坐标 后面才能为res填充数据找到相对应的位置

  var st = [];

  for (var i = 0; i < n * 2; i++) {
    while (st.length && nums[st[st.length - 1]] < nums[i % n]) {
      res[st.pop()] = nums[i % n];
    }

    st.push(i % n);
  }

  return res;
}; // 接雨水

/*
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
*/
// 方法一：双指针


var trap = function trap(height) {
  // 每一列雨水的高度取决于该列左侧最高和右侧最高柱子中最矮的柱子的高度，记录每列左边最高高度和右边最高高度
  //用数组记录左右最高高度，则下一次去的最高高度为max(maxLeft[i-1],height[i])
  var n = height.length;
  var maxLeft = new Array(n).fill(0);
  var maxRight = new Array(n).fill(0);
  maxLeft[0] = height[0];
  maxRight[n - 1] = height[n - 1];

  for (var i = 1; i < n; i++) {
    maxLeft[i] = Math.max(maxLeft[i - 1], height[i]);
  }

  for (var _i2 = n - 2; _i2 >= 0; _i2--) {
    maxRight[_i2] = Math.max(maxRight[_i2 + 1], height[_i2]);
  }

  var res = 0;
  var cnt;

  for (var _i3 = 0; _i3 < n; _i3++) {
    // 每根柱子课装水高度为最小那根减去自身高度
    cnt = Math.min(maxLeft[_i3], maxRight[_i3]) - height[_i3];
    res += cnt;
  }

  return res;
}; // 方法二：单调栈


var trap2 = function trap2(height) {
  // 每个可装水的面积为w*h,w为左右柱子的宽度，也就是位置索引之差，高度为min(l,r),所以遇大一个凹槽，nums[i]>st.top(),nums[i]为
  // r,st.pop(),st.top()为l,h=min(l,r)-mid,并且遇到相同高度的要继续入栈，因为求宽度时最要拿到的r是最右边的
  var st = [];
  var res = 0;

  for (var i = 0; i < height.length; i++) {
    while (st.length && height[st[st.length - 1]] < height[i]) {
      var mid = st.pop();

      if (st.length) {
        var h = Math.min(height[i], height[st[st.length - 1]]) - height[mid];
        var w = i - st[st.length - 1] - 1;
        res += h * w;
      }
    }

    st.push(i);
  }

  return res;
}; // 有效括号


function isValid(str) {
  var st = [];

  for (var i = 0; i < str.length; i++) {
    var c = s[i];

    switch (c) {
      case '(':
        st.push(')');
        break;

      case '[':
        st.push(']');
        break;

      case '{':
        st.push('}');
        break;

      default:
        if (st[st.length - 1] !== c) {
          return false;
        }

    }
  }

  return st.length === 0;
} //队列实现栈


var MyStack = function MyStack() {
  this.que = [];
};

MyStack.prototype.push = function (x) {
  this.que.push(x);
};

MyStack.prototype.pop = function () {
  var size = this.que.length;

  while (size-- > 1) {
    this.que.push(this.que.shift());
  }

  return this.que.shift();
};

MyStack.prototype.top = function () {
  //弹出的即是栈顶元素
  var x = this.pop(); //补回弹出的元素

  this.que.push(x);
  return x;
};

MyStack.prototype.empty = function () {
  return !this.que.length;
};
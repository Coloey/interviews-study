"use strict";

//双指针：要求数组排序
var twoSum = function twoSum(nums, target) {
  var i = 0,
      j = nums.length - 1;
  var res = 0;

  while (i < j) {
    if (nums[i] + nums[j] > target) j--;else if (nums[i] + nums[j] < target) i++;else {
      res++;
      i++;
      j--;
    }
  }

  return res;
};

console.log(twoSum([1, 2, 3, 4, 4], 5));
console.log(twoSum([1, 1, 2, 3, 4, 4], 5)); //数组可以不排序 重复元素可以共用

var twoSum2 = function twoSum2(nums, target) {
  var hash = [],
      res = [];

  for (var i = 0; i < nums.length; i++) {
    if (hash.includes(target - nums[i])) {
      res.push([nums[i], target - nums[i]]); //重复元素不可重用
      //hash.splice(hash.indexOf(target-nums[i]),1)
    }

    hash.push(nums[i]);
  }

  return res;
};

console.log(twoSum2([2, 1, 4, 3, 4], 5));
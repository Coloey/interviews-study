// 分发饼干
const findContentChildren = function (g, s) {
  // 胃口
  g.sort((a, b) => a - b);
  // 饼干
  s.sort((a, b) => a - b);
  let index = s.length - 1;
  let res = 0;
  for (let i = g.length - 1; i >= 0; i--) {
    if (index >= 0 && s[index] >= g[i]) {
      res++;
      index--;
    }
  }
  return res;
};
// 摆动序列
// dp[i][0]:前i个数，第i个数作为山峰的摆动序列的最长长度
// dp[i][1]：前i个数，第i个数作为山谷的摆动序列的最长长度
const wiggleMaxLength = (nums) => {
  let dp = new Array(nums.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(2).fill(0);
    dp[i][0] = dp[i][1] = 1;
  }
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[i]) {
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + 1);
      }
    }
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + 1);
      }
    }
  }
  return Math.max(dp[nums.length - 1][0], dp[nums.length - 1][1]);
};
// 最大子序和
const maxSubArray = (nums) => {
  let res = Number.MIN_VALUE;
  let cnt = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    cnt = 0;
    // 从起始位置i开始遍历寻找最大值
    for (let j = i + 1; j < nums.length; j++) {
      cnt += nums[j];
      if (res < cnt) {
        res = cnt;
      }
      if (cnt <= 0) cnt = 0; // 遇到负数重置起始位置
    }
  }
  return res;
};

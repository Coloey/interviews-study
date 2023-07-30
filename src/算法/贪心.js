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
// 跳跃游戏
const jump = (nums) => {
  // 可以跳跃的最远距离
  let max = 0;
  // 每次在可以覆盖的的范围max里面取值
  for (let i = 0; i <= max; i++) {
    if (i + nums[i] > max) max = i + nums[i];
    if (max >= nums.length - 1) return true;
  }
  return false;
};
// 区间问题
// 用最少数量引爆气球
const findMinArrowShots = (points) => {
  if ((points.length = 0)) return 0;
  points.sort((a, b) => a[0] - b[0]);
  // points不为空至少一箭
  let res = 1;
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > points[i - 1][1]) {
      res++; // 不挨着至少一箭
    } else {
      points[i][1] = Math.max(points[i - 1][1], points[i][1]); // 挨着需要更新气球最小右边界
    }
  }
  return res;
};
// 无重叠子区间
const eraseOverlapIntervals = (intervals) => {
  if (intervals.length === 0) return 0;
  let res = 1;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > intervals[i - 1][1]) {
      // 找出不重叠子区间
      res++;
    } else {
      intervals[i][1] = Math.max(intervals[i - 1][1], intervals[i][1]);
    }
  }
  // 重叠区间个数=总区间-不重叠区间
  return intervals.length - res;
};
// 合并区间
const merge = (intervals) => {
  let pre = intervals[0];
  let curr;
  let res = [];
  for (let i = 1; i < intervals.length; i++) {
    curr = intervals[i];
    if (curr[0] > pre[1]) {
      // 当前区间和前一个区间没重叠 前一个区间加入 更新区间
      res.push(pre);
      pre = curr;
    } else {
      // 当前区间和前一个区间重叠 更新前一个区间右边界 即合并区间
      pre = Math.max(pre[1], curr[1]);
    }
  }
  return res;
};

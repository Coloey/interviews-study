"use strict";

//爬楼梯
var test1 = function test1(n) {
  var dp = new Array(n + 1).fill(0); //dp[i]=dp[i-1]+dp[i-2];

  dp[0] = 1, dp[1] = 1, dp[2] = 2;

  for (var i = 3; i <= n; i++) {
    dp[n] = dp[n - 1] + dp[n - 2];
  }

  return dp[n];
}; //最小花费爬楼梯


var test2 = function test2(costs) {
  var n = costs.length;
  var dp = new Array(n + 1).fill(0);

  for (var i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + costs[i - 1], dp[i - 2] + costs[i - 2]);
  }

  return dp[n];
}; // 整数拆分


var test3 = function test3(n) {
  //dp[n]=dp[i]*(n-i);
  var dp = new Array(n + 1).fill(0);
  dp[1] = 1, dp[2] = 1;

  for (var i = 3; i <= n; i++) {
    for (var j = 1; j <= Math.floor(i / 2); j++) {
      dp[i] = Math.max(dp[i], Math.max((i - j) * j, j * dp[i - j]));
    }
  }

  return dp[n];
}; //01背包 分割等和子集


var test4 = function test4(nums) {
  var sum = 0;

  for (var i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  if (sum % 2 === 1) return false;
  var target = sum / 2; //和为target的背包是否能被装满，不可重复放入=>01背包
  //dp[j]:容量为j的背包 所背的物品价值最大为dp[j],求最大物品价值，所以初始化为0,不会被覆盖

  var n = nums.length;
  var dp = new Array(n + 1).fill(0);

  for (var _i = 0; _i <= n; _i++) {
    for (var j = target; j >= nums[_i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[_i]] + nums[_i]);
    }
  }

  return dp[target] === target;
}; //完全背包为了物品可以重复放，所以内层for循环顺序可以正序
//而01背包物品不可以重复放 所以内层循环必须倒序(一维数组)
// 零钱兑换ii


var test5 = function test5(amount, coins) {
  // 凑成金额i的方法数为dp[i]
  var dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (var i = 0; i < coins.length; i++) {
    for (var j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }

  return dp[amount];
}; //零钱兑换


var test6 = function test6(coins, amount) {
  //dp[i]表示能凑成总金额为i的最少硬币数为dp[i]
  var dp = new Array(amount + 1).fill(Number.MAX_VALUE);
  dp[0] = 0; // dp[j]=Math.max(dp[j],dp[j-coins[i]]+1)

  for (var i = 0; i < coins.length; i++) {
    for (var j = coins[i]; j <= amount; j++) {
      // 计算过的才继续比较
      if (dp[j - coins[i]] !== Number.MAX_VALUE) {
        dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
      }
    }
  }

  return dp[amount] === Number.MAX_VALUE ? -1 : dp[amount];
}; // 完全平方数


var test7 = function test7(n) {
  // dp[j]:和为j的完全平方数的最少数量为dp[j]
  var dp = new Array(n + 1).fill(0); // dp[j]=Math.min(dp[j], dp[j-i*i]+1);

  dp[1] = 1;

  for (var i = 1; i * i <= n; i++) {
    for (var j = i * i; j <= n; j++) {
      dp[j] = Math.min(dp[j], dp[j - i * i] + 1);
    }
  }

  return dp[n];
}; //组合总和iV


var test8 = function test8(nums, target) {
  //dp[j]:和为j的组合个数有dp[j]个
  var dp = new Array(target + 1).fill(0);
  dp[0] = 1; //初始化 比如[1,2,3],dp[2]=dp[0]+dp[1]=2，则dp[0]=1
  //dp[i]+=dp[i-nums[j]]
  //排列总和 顺序不同为两个不同的结果 所以外层循环为背包容量 内层循环为物品

  for (var i = 0; i <= target; i++) {
    for (var j = 0; j < nums.length; j++) {
      if (i > nums[j]) {
        dp[i] += dp[i - nums[j]];
      }
    }
  }

  return dp[target];
}; // 打家劫舍


var test9 = function test9(nums) {
  var n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0]; // dp[i]:前i个房子偷到的最大金额为dp[i]

  var dp = new Array(n).fill(0);
  dp[0] = nums[0], dp[1] = Math.max(nums[0], nums[1]);

  for (var i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[n - 1];
}; // 打家劫舍2


var test10 = function test10(nums) {
  var n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  var rob = function rob(nums, start, end) {
    if (start === end) return nums[start];
    var dp = new Array(nums.length);
    dp[start] = nums[start], dp[start + 1] = Math.max(nums[start], nums[start + 1]);

    for (var i = start + 2; i <= end; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }

    return dp[end];
  };

  var res1 = rob(nums, 0, n - 2);
  var res2 = rob(nums, 1, n - 1);
  return Math.max(res1, res2);
}; // 买卖股票i


var test11 = function test11(prices) {
  // dp[i][1]:第i天持有股票，dp[i][0]:第i天不持有股票
  var dp = new Array(prices.length);

  for (var i = 0; i < prices.length; i++) {
    dp[i] = new Array(2).fill(0);
  }

  dp[0][1] = -prices[0];

  for (var _i2 = 1; _i2 < prices.length; _i2++) {
    dp[_i2][0] = Math.max(dp[_i2 - 1][0], dp[_i2 - 1][1] + prices[_i2]);
    dp[_i2][1] = Math.max(dp[_i2 - 1][1], -prices[_i2]);
  }

  return dp[prices.length - 1][0];
}; // 买卖股票II


var test12 = function test12(prices) {
  // dp[i][1]:第i天持有股票，dp[i][0]:第i天不持有股票
  var dp = new Array(prices.length);

  for (var i = 0; i < prices.length; i++) {
    dp[i] = new Array(2).fill(0);
  }

  dp[0][1] = -prices[0];

  for (var _i3 = 1; _i3 < prices.length; _i3++) {
    dp[_i3][0] = Math.max(dp[_i3 - 1][0], dp[_i3 - 1][1] + prices[_i3]);
    dp[_i3][1] = Math.max(dp[_i3 - 1][1], dp[_i3 - 1][0] - prices[_i3]);
  }

  return dp[prices.length - 1][0];
}; //买卖股票III
//买卖股票IV
// 最长递增子序列


var test15 = function test15(nums) {
  var n = nums.length;
  var dp = new Array(n + 1).fill(1); //前i个数字的最长递增子序列为dp[i]

  var res = 0;

  for (var i = 2; i <= n; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    if (dp[i] > res) res = dp[i];
  }

  return res;
}; // 最长连续递增序列


var test16 = function test16(nums) {
  var n = nums.length;
  var dp = new Array(n + 1).fill(1);
  var res = 0;

  for (var i = 1; i <= n; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i] + 1;
    }

    res = Math.max(dp[i], res);
  }

  return res;
}; // 最长重复子数组/连续子序列


var test17 = function test17(nums1, nums2) {
  // dp[i][j]以下标i-1结尾的A和以下标j-1结尾的B，最长重复子数组的长度为dp[i][j]
  // nums1[i]===nums2[j]=>dp[i][j]=dp[i-1][j-1]+2
  var m = nums1.length,
      n = nums2.length;
  var dp = new Array(m + 1);
  var res = 0;

  for (var i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (var _i4 = 1; _i4 <= m; _i4++) {
    for (var j = 1; j <= n; j++) {
      if (nums1[_i4 - 1] === nums2[j - 1]) {
        dp[_i4][j] = dp[_i4 - 1][j - 1] + 1;
      }

      res = Math.max(res, dp[_i4][j]);
    }
  }

  return res;
}; // 最长公共子序列/不连续


var test18 = function test18(text1, text2) {
  // dp[i][j]:长度为[0,i-1]的字符串text1和长度[0,j-1]的字符串text2最长公共子序列为dp[i][j]
  // text1[i-1]===text2[j-1] => dp[i][j]=dp[i-1][j-1]+1
  // text1[i-1]!==text2[j-1] => max(dp[i-1][j],dp[i][j-1])
  var m = text1.length,
      n = text2.length;
  var dp = new Array(m + 1);

  for (var i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (var _i5 = 1; _i5 <= m; _i5++) {
    for (var j = 1; j <= n; j++) {
      if (text1[_i5 - 1] === text2[j - 1]) {
        dp[_i5][j] = dp[_i5 - 1][j - 1] + 1;
      } else {
        dp[_i5][j] = Math.max(dp[_i5 - 1][j], dp[_i5][j - 1]);
      }
    }
  }

  return dp[m][n];
}; // 最大子序和:给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和


var test19 = function test19(nums) {
  //dp[i]:前i个元素，具有最大和的连续子数组和为dp[i]
  var dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  var res = dp[0];

  for (var i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    res = Math.max(res, dp[i]);
  }

  return res;
}; // 判断子序列:给定字符串 s 和 t ，判断 s 是否为 t 的子序列


var test20 = function test20(s, t) {
  //dp[i][j]:s前i个字符和t前j个字符，相同子序列的长度为dp[i][j],看是否和s的长度相同
  // s[i-1]===t[j-1]=>dp[i][j]=dp[i-1][j-1]+1
  // s[i-1]!==t[j-1]=>dp[i][j]=dp[i][j-1] //删除一个t元素
  var m = s.length,
      n = t.length;
  var dp = new Array(m + 1);

  for (var i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (var _i6 = 1; _i6 <= m; _i6++) {
    for (var j = 1; j <= n; j++) {
      if (s[_i6 - 1] === t[j - 1]) {
        dp[_i6][j] = dp[_i6 - 1][j - 1] + 1;
      } else {
        dp[_i6][j] = dp[_i6][j - 1];
      }
    }
  }

  return dp[m][n] === m;
}; // 回文子串

/*给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串*/


var test21 = function test21(s) {
  // dp[i][j]:s[i,j]是否为回文串为dp[i][j]
  // s[i]===s[j]=>dp[i+1][j-1]
  // j-i<1 dp[i][j]=true
  var n = s.length;
  var res = 0;
  var dp = new Array(n).fill(false);

  for (var i = n - 1; i >= 0; i--) {
    for (var j = i; j < n; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1 || dp[i + 1][j - 1]) {
          dp[i][j] = true;
          res++;
        }
      }
    }
  }

  return res;
}; // 最长回文子序列


var test22 = function test22(s) {
  //dp[i][j]:s[i,j]的最长回文子序列长度为dp[i][j]
  //s[i]===s[j]:dp[i][j]=dp[i+1][j-1]+2
  var n = s.length;
  var dp = new Array(n);

  for (var i = 0; i < n; i++) {
    dp[i] = new Array(n + 1).fill(0);
    dp[i][i] = 1; //一个字符为回文子串 初始化为1
  }

  for (var _i7 = n - 1; _i7 >= 0; _i7--) {
    for (var j = _i7 + 1; j < n; j++) {
      if (s[_i7] === s[j]) {
        dp[_i7][j] = dp[_i7 + 1][j - 1] + 2;
      } else {
        dp[_i7][j] = Math.max(dp[_i7 + 1][j], dp[_i7][j - 1]); //不相同则看增加哪个区间能扩大回文子序列的长度
      }
    }
  }

  return dp[0][n - 1];
}; //最长回文子串


var test23 = function test23(s) {
  //dp[i][j]:表示s[i..j]是否是回文串
  var dp = new Array(s.length);

  for (var i = 0; i < dp.length; i++) {
    dp[i] = new Array(s.length).fill(false);
  }

  var res = "";

  for (var _i8 = s.length - 1; _i8 >= 0; _i8--) {
    for (var j = _i8; j < s.length; j++) {
      if (s[_i8] === s[j]) {
        if (j - _i8 <= 1 || dp[_i8 + 1][j - 1]) {
          dp[_i8][j] = true;
        }

        if (j - _i8 + 1 > res.length && dp[_i8][j]) {
          res = s.slice(_i8, j + 1);
        }
      }
    }
  }

  return res;
}; //给定一个长度为n的整数数组 a，实现一个算法，计算出从 a 中选择出多个不相邻元素组成最大的和是多少。

/*input:  [1, 4, 5, 3]
output: 7

input:  [12, 3, 6, 1, 2, 4]
output: 22
*/


var rob = function rob(nums) {
  var n = nums.length; // 前i个元素的最大和是dp[i],dp[i]=Math.max(dp[i-2]+nums[i],dp[i-1])

  var dp = new Array(n);

  if (n >= 2) {
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
  }

  for (var i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[n - 1];
};
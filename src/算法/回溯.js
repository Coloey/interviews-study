// 电话号码组合
const letterCombanations = (digits) => {
  if (digits.length == 0) return [];
  const letterMap = [
    "", //0
    "", //1
    "abc", //2
    "def", //3
    "ghi", //4
    "jkl", //5
    "mno", //6
    "pqrs", //7
    "tuv", //8
    "wxyz", //9
  ];
  let res = [];
  let s = [];
  const dfs = (digits, index) => {
    if (index === digits.length) {
      res.push(s.slice().join(""));
      return;
    }
    // index有两层含义：1.遍历递归树的层数；2.
    let letterIndex = +digits[index];
    // 拿到字母
    let letter = letterMap[letterIndex];
    // 遍历的是不同的集合 所以i可以从0开始
    for (let i = 0; i < letter.length; i++) {
      s.push(letter[i]);
      dfs(digits, index + 1);

      s.pop();
    }
  };
  dfs(digits, 0);
  return res;
};
/* 组合
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例: 输入: n = 4, k = 2 输出: [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4], ]
*/
/*组合问题一个集合元素不能向前取，相同元素不同排列属于一个组合,因此需要从
startIndex开始取，并且每下一层只能往后面取数*/
const conbine1 = (n, k) => {
  const res = [];
  let path = [];
  const dfs = (n, start) => {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      dfs(n, i + 1);
      path.pop();
    }
    return res;
  };
  dfs(n, 1);
  return res;
};
// 组合总和III
/*找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
 */
const conbine2 = (n, k) => {
  let res = [];
  let path = [];
  let sum = 0;
  const dfs = (start) => {
    if (path.length === k) {
      if (sum === n) res.push(path.slice());
      return;
    }
    for (let i = start; i <= 9 && sum < k; i++) {
      path.push(i);
      sum += i;
      dfs(i + 1);
      sum -= i;
      path.pop();
    }
  };
  dfs(1);
  return res;
};
//组合总和II
const conbine3 = (candidates, target) => {
  candidates.sort((a, b) => a - b);
  let res = [];
  let path = [];
  let used = new Array(candidates.length).fill(false);
  let sum = 0;
  const dfs = (start) => {
    if (sum === target) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      // 同一层 重复元素，遍历到第二个，不可重复取 此时前一个use[i-1]为false
      // 不同层重复元素可以重复取，此时前一个used[i-1]为true
      if (i > 0 && candidates[i] === candidates[i - 1] && used[i - 1] === false)
        continue;
      path.push(candidates[i]);
      used[i] = true;
      sum += candidates[i];
      dfs(i + 1);
      sum -= candidates[i];
      used[i] = false;
      path.pop();
    }
  };
  dfs(1);
  return res;
};
// 排列问题：元素可以向前取，不同顺序相同元素时不同排列，但是一个排列元素不能重复取，因此没有startIndex
// 每次从0开始取
// visite数组记录一次排列中取过的元素
const sortQue = (nums) => {
  let res = [];
  let path = [];
  const dfs = () => {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.indexOf(nums[i]) !== -1) continue;
      path.push(nums[i]);
      dfs();
      path.pop();
    }
  };
  dfs();
  return res;
};
// 全排列II
// 数组中有相同的元素,给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
const sortQue2 = (nums) => {
  let res = [];
  let path = [];
  nums.sort((a, b) => a - b);
  let used = new Array(nums.length).fill(false);
  const dfs = () => {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && used[i - 1] === false) continue;
      // 没有start,所以为了避免重复读取
      if (used[i] === false) {
        used[i] = true;
        path.push(nums[i]);
        dfs();
        path.pop();
        used[i] = false;
      }
    }
  };
  dfs();
  return res;
};
// 子集
const ziji = (nums) => {
  let res = [];
  let path = [];
  const dfs = (start) => {
    res.push(path.slice());
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
};
// 子集II：数组总包含重复元素，返回该数组所有可能子集
const ziji2 = (nums) => {
  let res = [];
  let path = [];
  let used = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b);
  const dfs = (start) => {
    res.push(path.slice());
    for (let i = start; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && used[i - 1] === false) continue;
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
};
// 递增子序列
const findSubsequence = (nums) => {
  const res = [];
  const path = [];
  const dfs = (start) => {
    if (path.length >= 2) {
      res.push(path.slice());
    }
    let set = new Set()
    for (let i = start; i < nums.length; i++) {
      if (path.length > 0 && nums[i] < path[path.length - 1] || set.has(nums[i])) {
        continue
      }
      path.push(nums[i]);
      set.add(nums[i])
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
};
/*总结：
排列问题：
1.每层都从从0开始搜索
2.需要used数组记录path放的元素 避免重复读取 要判断used[i]==false才能读取
排列+去重：
1.树层去重sort, i>0&&nums[i]===nums[i-1]&&used[i-1]===false
2.没有start,所以为了避免重复读取，要判断used[i]==false才能读取
组合问题：
1.每层都从start搜索。下一层start=i+1,避免向前取数
组合中有重复元素加去重：
树层去重 sort,i>0&&nums[i]===nums[i-1]&&used[i-1]===false
子集：
1.每层都从start搜索。下一层start=i+1,避免向前取数
2.res直接push path,个数不限
有重复元素：树层去重 sort,i>0&&nums[i]===nums[i-1]&&used[i-1]===false
*/

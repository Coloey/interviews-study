//计算二进制数中1的个数
const countBinary = (num) => {
  let res = 0;
  while (num > 0) {
    if (num & 1) {
      res++;
    }
    num = num >> 1;
  }
  return res;
};
function findLongestSubstring(str) {
  let longest = 0; // 记录最长不重复子串的长度
  let seen = {}; // 用于存储字符最近一次出现的索引位置的下一位
  let start = 0; // 当前不重复子串的起始位置

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (seen[char]) {
      // 如果字符已经出现过，则更新起始位置 会移动到出现过的字符下一位
      start = Math.max(start, seen[char]);
    }
    // 计算当前不重复子串的长度，并更新最长长度
    longest = Math.max(longest, i - start + 1);
    // 将字符的索引位置下一位存储到 seen 对象中
    seen[char] = i + 1;
  }

  return longest;
}
console.log(findLongestSubstring("abcabcbb")); // 输出 3，最长不重复子串为 "abc"
console.log(findLongestSubstring("bbbbb")); // 输出 1，最长不重复子串为 "b"
console.log(findLongestSubstring("pwwkew")); // 输出 3，最长不重复子串为 "wke"

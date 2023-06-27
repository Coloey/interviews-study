function findLongestSubstring(s) {
  let maxLen = 0;
  let currLen = 0;
  let longestSubstring = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (c.match(/^[a-zA-Z]+$/)) {
      currLen++;
    } else {
      currLen = 0;
    }
    if (currLen > maxLen) {
      maxLen = currLen;
      longestSubstring = s.substring(i - maxLen + 1, i + 1);
    }
  }
  return longestSubstring;
}
console.log(findLongestSubstring("ab123diiooo"));

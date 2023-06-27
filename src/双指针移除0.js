// 不用空间复杂度
function moveZero(nums) {
  let slow = 0;
  let fast = 0;
  // fast 找出不是0的元素
  // slow更新数组下标
  while (slow < nums.length && fast < nums.length) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
    fast++;
  }
  console.log(nums);
}
const nums = [1, 0, 2, 0, 3];
//console.log(nums);
moveZero(nums);

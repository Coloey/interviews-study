const twoSum = (nums, target) => {
  let i = 0,
    j = nums.length - 1;
  let res = 0;
  while (i < j) {
    if (nums[i] + nums[j] > target) j--;
    else if (nums[i] + nums[j] < target) i++;
    else {
      res++;
      i++;
      j--;
    }
  }
  return res;
};
console.log(twoSum([1, 2, 3, 4, 4], 5));
console.log(twoSum([1, 1, 2, 3, 4, 4], 5));

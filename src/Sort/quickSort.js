let quickSort = (nums, l, r) => {
    if (l > r) return;
    let i = l,
      j = r;
    let pivot = nums[l];
    while (i < j) {
      while (nums[j] >= pivot && i < j) j--;
      while (nums[i] <= pivot && i < j) i++;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    [nums[i], nums[l]] = [nums[l], nums[i]]; //和最左边的基准值交换
    quickSort(nums, l, i - 1);
    quickSort(nums, i + 1, r);
  };
  let nums = [7, 1, 3, 5, 4, 8];
  quickSort(nums, 0, nums.length - 1);
  console.log(nums);
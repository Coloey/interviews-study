const mergeSort = (nums, l, r) => {
  if (l >= r) return;
  let mid = l + Math.floor((r - l) / 2);
  mergeSort(nums, l, mid);
  mergeSort(nums, mid + 1, r);
  let i = l,
    j = mid + 1,
    newArr = [],
    k = 0;
  // console.log(l, r);
  while (i <= mid && j <= r) {
    if (nums[i] < nums[j]) {
      newArr[k++] = nums[i++];
    } else {
      newArr[k++] = nums[j++];
    }
  }
  while (i <= mid) {
    newArr[k++] = nums[i++];
  }
  while (j <= r) {
    newArr[k++] = nums[j++];
  }
  //console.log(newArr);
  for (let x = 0; x < k; x++) {
    nums[l + x] = newArr[x];
  }
};
let nums = [7, 4, 2, 1, 5, 6];
mergeSort(nums, 0, 5);
console.log(nums);

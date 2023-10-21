// 寻找旋转数组的最小值I
/*给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素*/
const findMin = function (nums) {
  let low = 0,
    high = nums.length - 1;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    //最小值在右边
    if (nums[mid] > nums[high]) {
      low = mid + 1;
      //最小值在左边
    } else if (nums[mid] < nums[high]) {
      high = mid;
    }
  }
  return nums[low];
};
// 寻找旋转数组最小值II
//数组有重复元素
/*
nums总是可分为:nums1与nums2两个子数组,并且两个数组都是递增的,且nums1[i]>=nums2[j]
        mid的索引取地板除,最终要根据nums[mid]与nums[right]进行范围缩小
        最终要找的是nums2的起始索引对应的值
        1.nums[mid]>nums[right],如[5,6,7,8,4],那么nums2起点必定严格位于mid(不含)右边,left=mid+1
        2.nums[mid]<nums[right],如[5,1,2,3,4],那么nums2起点必定位于mid(含)左边,right=mid
        3.nums[mid]==nums[right],如[5,1,2,2,2],那么right--继续进入下一轮循环
            3.1 这个操作不会越界:right>left>=0
            3.2 这个操作会一直尝试收缩右边界间接缩小mid直至[mid,right]跳出相等范围序列
            而被收缩的原本的nums[right]必定不是唯一的最小值,换句话说有效范围依然合法
            反证:nums[right]是唯一最小值,left<right && mid<right(地板除)
                因此不可能出现nums[mid]==nums[right]与题设矛盾
            有以下几种情况:[3,4,2,2,2,2];[3,2,2,2,2,2];[2,2,2,2,2,2]
            都可以正确求出最小值索引
*/
const findMin2 = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    // 最小值在右边
    if (nums[mid] > nums[right]) {
      left = mid + 1;
      //最小值在左边
    } else if (nums[mid] < nums[high]) {
      right = mid;
    } else {
      right--;
    }
  }
  return nums[left];
};
//搜索旋转数组
const findNums = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    //判断nums[mid]在左半段还是右半段 然后判断target是否在范围内
    //左半段
    if (nums[mid] >= nums[left]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      //右半段
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

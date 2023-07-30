/*
输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
*/
const nextMax = (nums1, nums2) => {
  let map = new Map();
  let res = new Array(nums1.length).fill(-1);
  for (let x of nums1) {
    map.set(x, nums2.indexOf(x));
  }
  let st = [];
  for (let i = 0; i < nums2.length; i++) {}
  return res;
};

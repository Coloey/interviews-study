function sort(arr) {
  let preIndex, curr;
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1;
    curr = arr[i];
    while (preIndex >= 0 && arr[preIndex] > curr) {
      //往后移动
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = curr;
  }
  return arr;
}
console.log(sort([2, 4, 1, 5, 7]))

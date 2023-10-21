let len;
function buildMaxHeap(arr) {
  //建立大顶堆
  len = arr.length;
  //从第一个非叶子结点的下标i=Math.floor(arr.length/2-1),从右到左，从下到上遍历所有非叶子结点
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, i);
  }
}
function heapify(arr, i) {
  //调整堆 以父结点 左孩子 右孩子
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < len && arr[right] < arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, largest);
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    //第一个元素最大，和最后一个交换后，对除了最后一个元素之外的排序，大顶堆降序，小顶堆升序
    swap(arr, 0, i);
    len--;
    heapify(arr, 0);
  }
  return arr;
}

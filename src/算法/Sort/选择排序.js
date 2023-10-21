function sort(arr) {
  const n = arr.length;
  let minIndex;
  for (let i = 0; i < n; i++) {
    minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[j], arr[minIndex]] = [arr[minIndex], arr[j]];
    /*
        arr[j]^=arr[minIndex]
        arr[minIndex]^=arr[j]
        arr[j]^=arr[minIndex]
         */
  }
  return arr;
}

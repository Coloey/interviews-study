const mergeArray = (arr1, arr2) => {
    let m = arr1.length,
        n = arr2.length;
    let i = m - 1,
        j = n - 1,
        k = m + n - 1;
    while (i >= 0 || j >= 0) {
        if (m === 0) {
            return arr2;
        } else if (n === 0) {
            return arr1;
        } else if (arr1[i] > arr2[j]) {
            arr1[k--] = arr1[i--]
        } else {
            arr1[k--] = arr2[j--]
        }
    }
    return arr1;
}
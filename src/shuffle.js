function shuffle(arr){
    let len=arr.length-1,random
    while(len!==0){
        //从数组最后一个元素向前，向下取整，从数组中的前len-1个元素任意取一个与最后一个元素交换，继续取倒数第二个元素，与前n-2元素交换
        random = Math.floor(Math.random()*(len-1))
        [arr[random],arr[len]]=[arr[len],arr[random]]
        len--
    }
    return arr
}
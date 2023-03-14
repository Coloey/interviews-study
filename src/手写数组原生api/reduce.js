// callbackfn 被调用时会传入四个参数：

// previousValue（前一次调用 callbackfn 得到的返回值）
// currentValue（数组中正在处理的元素）
// currentIndex（数组中正在处理的元素的索引）
// 被遍历的对象
Array.prototype.myReduce=function(callback,initValue){
    if(typeof callback !== 'function'){
        throw new Error(`${callback} is not a function`)
    }
    let arr=this
    let preValue=initValue
    let index=0,len=arr.length
    if(!preValue){
        //空属性不能作为初始值，去掉空属性
        while(index<len && !(index in arr)){
            index++;
        }
        if(index>=len){
            throw new Error('Reduce of empty array with no initial value')
        }
        //将第一个有效数组元素作为第一个元素
        preValue=arr[index++]
    }
    while(index<len){
        preValue=callback(preValue,arr[index],index,arr)
        index++
    }
    return preValue
}
//every只要一项为false，就返回false,some是只要一个为true就返回true,否则返回false,
//而find和some类似，不过find找不到返回undefined,findIndex则是找到第一个符合条件的返回索引
Array.prototype.every=function(fn,thisArg){
    if(typeof fn !=='function'){
        throw new Error("the first argument must be a function")
    }
    let arr=this
    for(let i=0;i<arr.length;i++){
        if(!fn.call(thisArg,arr[i],i,arr)){
            return false
        }
    }
    return true
}
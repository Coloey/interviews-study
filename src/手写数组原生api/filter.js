Array.prototype.myFilter=function(fn,thisArg){
    if(typeof fn !== 'function'){
        throw new Error("the first argument is not a function")
    }
    let arr=this
    let res=[]
    for(let i=0;i<arr.length;i++){
        if(fn.call(thisArg,arr[i],i,arr)){
            res.push(item)
        }
    }
}
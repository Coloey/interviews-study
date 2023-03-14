function myMap(fn,thisArg){
    if(typeof fn !=='function'){
        throw new Error("the first argument must be a function")
    }
    let res=[]
    let currArr=this
    for(let i=0;i<currArr.length;i++){
        res[i]=fn.call(thisArg,currArr[i],i,currArr)
    }
    return res
}
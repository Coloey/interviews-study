Array.prototype.mapUsingReduce=function(callback,context){
    if(typeof callback !== 'function'){
        throw new Error(`${callback} is not a function`)
    }
    return this.reduce(function(mappedArray,currentValue,currentIndex,array){
        mappedArray[currentIndex]=callback.call(context,currentValue,currentIndex,array)
        return mappedArray
    },[])
}
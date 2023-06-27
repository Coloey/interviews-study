function myNew(Fn,...args){
    let obj = {}
    obj.__proto__=Fn.prototype
    let result = Fn.apply(obj, args)
    return result instanceof Object ? result : obj;//返回常数直接忽略，返回对象
}

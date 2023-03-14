Object.defineProperty(Object,'assign',{
    value:
    function (target,...args){
        if(target===null)return new TypeError("Can't convert null or undefined to object")
        //目标对象统一为引用数据类型
        const to=Object(target);
        for(let i=0;i<args.length;i++){
            //每一个源对象
            const nextSource=args[i];
            if(nextSource!==null){
                //使用for...in 和hasOwnProperty双重判断，确保只拿到本身的属性，方法（不包含继承的)
                for(const nextKey in nextSource){
                    if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){
                        to[nextKey]=nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    },
    //不可枚举
    enumerable:false,
    writable:true,
    configurable:true  
})
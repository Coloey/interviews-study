Object.defineProperty(Object,'is',{
    value:
    function(x,y){
        if(x===y){
            return x!==0||y!==0||1/x!==1/y
        }else{
            return x!==x&&y!==y
        }
    },
    enumerable:false,
    writable:true,
    configurable:true
})
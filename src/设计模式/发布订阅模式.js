var Event=(function(){
    let clientList = {},
    listen,
    trigger,
    remove;
    listen = function(key,fn){
        if(!clientList[fn]){
            clientList[key]=[]
        }
        clientList[key].push(fn)

    }
    trigger = function(){
        let key = Array.prototype.shift.call(arguments),
            fn = clientList[key];
        if(!fns ||fns.length===0){
            return false
        }
        for(let i=0;fn;fn=fns[i++]){
            fn.apply(this,arguments)
        }
    }
    remove = function(key,fn){
        let fns = clientList[key]
        if(!fns){
            return false
        }
        if(!fn){
            fns && (fns.length=0)
        }else{
            fns = fns.filter(_fn=>_fn!==fn)
        }
    }
    return {
        listen,
        trigger,
        remove
    }

}())
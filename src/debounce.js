 //防抖:n秒后再执行该事件，若在n秒内被重复触发，则重新计时
 function debounce(fn,delay=500){
    let timer;
    return function(...args){
        let context = this
        if(timer)clearTimeout(timer)//n秒内只能触发一次,若在n秒内重复触发，都会被清除0
        timer=setTimeout(()=>{
            fn.apply(context,args)
        },delay)
    }
}
function debounce2(fn,delay=500,immediate){
    let timer
    return function(...args){
        let context = this
        if(timer)clearTimeout(timer)
        if(immediate){
            immediate=!immediate
            fn.apply(context,args)
        }else{
            timer = setTimeout(()=>{
                fn.apply(context,args)
            },delay)
        }
    }
}
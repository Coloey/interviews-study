 //参数柯里化
 const curry=(fn,...args)=>{
    return args.length<fn.length
    ? (..._args)=>curry(fn,...args,..._args)
    :fn(...args)
}
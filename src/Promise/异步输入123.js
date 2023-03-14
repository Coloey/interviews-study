//间隔输出123
const arr=[1,2,3]
arr.reduce(
   (p,x)=>{
    return p.then(()=>{
        return new Promise(resolve=>setTimeout(()=>resolve(console.log(x)),1000))
    })
},Promise.resolve())
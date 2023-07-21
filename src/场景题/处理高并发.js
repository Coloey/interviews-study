// 模拟一百条数据 const message = new Array(100).fill(''); for (let i = 0; i < 100; i++) {  message[i] = '第' + i + '条数据'; } // 模拟请求一千条数据

const message = new Array(100).fill("");
for (let i = 0; i < 100; i++) {
  message[i] = "第" + i + "条数据";
}
function axiosGet(idx){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(message[idx])
        },Math.random()*1000)
    })
}
async function asyncProcess(max=10){
    // 存放执行任务
    const task = []
    const ans = []
    for(let i=0;i<100;i++){
        const p=axiosGet(i).then((res)=>{
            ans.push(res)
            task.splice(task.indexOf(p),1)
        })
        task.push(p)
        if(task.length===max){
            await Promise.race(task)
        }
    }
    await Promise.allSettled(task)
    return ans
}
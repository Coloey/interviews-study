//实现maxRequest,成功后resolve结果，失败后重试，尝试超过一定次数才reject
function maxRequest(fn, maxNum) {
  return new Promise((resolve, reject) => {
    if (maxNum === 0) {
      reject("max request number");
      return;
    }
    Promise.resolve(fn)
      .then((value) => {
        resolve(value);
      })
      .catch(() => {
        return maxRequest(fn, maxNum - 1);
      });
  });
}
// async 实现
async function maxRequest2(fn,maxNum){
  for(let i=0;i<maxNum;i++){
    try{
      await new Promise((resolve,reject) => {
        fn()
        resolve()
      })
      // 在允许请求的次数内成功 则跳出循环
      break;
    }catch(err){
      // 失败则被捕获，进入下一轮循环
      console.log(err)
    }
  }
}
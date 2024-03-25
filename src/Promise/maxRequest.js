//实现maxRequest,成功后resolve结果，失败后重试，尝试超过一定次数才reject,同时超过10s自动失败
// 递归
function maxRequest(fn, maxNum) {
  return new Promise((resolve, reject) => {
    let timer=setTimeout(()=>{
      reject('error')
    },10000)
    if (maxNum === 0) {
      reject("max request number");
      clearTimeout(timer)
      return;
    }
    Promise.resolve(fn)
      .then((value) => {
        resolve(value);
        console.log(value)
        clearTimeout(timer)
      })
      .catch(() => {
        return maxRequest(fn, maxNum - 1);
      });
  });
}
function getProm() {
  const n = Math.random();
  return new Promise((resolve, reject) => {
      setTimeout(() => n > 0.9 ? resolve(n) : reject(n), 1000);
  });
}

maxRequest(getProm,5);
// 循环 async 实现
function maxRequest2(fn, maxNum) {
  return new Promise(async(resolve,reject) => {
    let timer=setTimeout(()=>{
      reject('error')
    },10000)
    for (let i = 0; i < maxNum; i++) {
      try {
        let value=await fn();
        resolve(value);
        clearTimeout(timer)
        // 在允许请求的次数内成功 则跳出循环
        break;
      } catch (err) {
        if(i===maxNum-1){
          reject('error')
          clearTimeout(timer)
        }else {
          // 失败则被捕获，进入下一轮循环
          console.error(err);
        }
      }
    }
  })
}
const fetchWithAutoRetry = (fetcher, maximumRetryCount) => {
  return new Promise((resolve, reject) => {
    let cnt = 0;
    const retry = () => {
      fetcher()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (cnt < maximumRetryCount) {
            cnt++;
            retry();
          } else {
            reject(error);
          }
        });
    };
    retry();
  });
};

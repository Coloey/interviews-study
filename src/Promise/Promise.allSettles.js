/*
Promise.all会在任何一个Promise对象失败时立即中止，并返回第一个失败的原因
而Promise.allSettled会等待所有Promise对象执行完毕，并返回每个Promise对象的执行结果，无论成功与否
*/
// Promise.allSettled 的结果数组中可能包含以下两种格式的数据

// {status:"fulfilled", value:result} 对于成功的响应
// {status:"rejected", reason:error} 对于 error

Promise.myAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let cnt = 0;
    let res = [];
    let len = promises.length;
    // 数组为空返回空数据
    if (len === 0) {
      return resolve([]);
    }
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((res) => {
          cnt += 1;
          res[i] = {
            status: "fulfilled",
            value: res,
          };
          if (len === cnt) {
            resolve(res);
          }
        })
        .catch((err) => {
          cnt += 1;
          res[i] = {
            status: "rejected",
            reason: err,
          };
          if (cnt === len) {
            resolve(res);
          }
        });
    });
  });
};
// 使用finally
function PromiseAllSettled(promises) {
  return new Promise((resolve) => {
    let res = [];
    let cnt = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((data) => {
          res[i] = { status: "fulfilled", value: data };
        })
        .catch((err) => {
          res[i] = { status: "rejected", reason: err };
        })
        .finally(() => {
          cnt++;
          cnt === promises.length && resolve(res);
        });
    });
  });
}

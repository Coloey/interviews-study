Promise.all = (promises) => {
  const res = [];
  count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise,i) => {
      Promise.resolve(promise)
        .then((value) => {
          res[i] = value;
          count += 1;
          if (count === promises.length) {
            resolve(res);
          }
        })
        .catch(reject);
    });
  });
};
Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
};
//Promise.any:一个成功就成功，所有Promise实例失败时,Promise.any才失败，把所有失败集合在一起，返回一个失败的promise和AggragateError类型的实例
Promise.any = function (promises) {
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
      .then(resolve, (err) => {
        arr[i] = { status: "rejected", val: err };
        count += 1;
        if (count === promises.length) reject(new Error("没有promise成功"));
      });
    });
  });
};
Promise.resolve = (param) => {
  if (param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if (
      param &&
      typeof param === "object" &&
      typeof param.then === "function"
    ) {
      setTimeout(() => {
        param.then(resolve, reject);
      });
    } else {
      resolve(param);
    }
  });
};
Promise.reject = (param) => {
  return new Promise((resolve, reject) => {
    return reject(reason);
  });
};

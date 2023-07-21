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

function getJson(url) {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    //创建一个http请求
    xhr.open("Get", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status >= 200 && this.status < 400) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    //设置错误监听函数
    xhr.onerror = function () {
      reject(new Error(this.statusText));
    };
    //设置响应数据类型
    xhr.setRequestHeader("Accept", "application/json");
    //发送http请求
    xhr.send(null);
  });
  return promise;
}

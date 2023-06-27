function jsonp(url, paramObj, fn) {
  //用于拼接请求参数
  const objToQuery = function (url, paramObj, fn) {
    const paramArr = [];
    for (let param in paramObj) {
      paramArr.push(
        encodeURIComponent(param) + "=" + encodeURIComponent(paramObj[param])
      );
    }
    return (
      url +
      "?" +
      (paramArr.length > 0 ? paramArr.join("&") + "&" : "") +
      `callback=${fn}`
    );
  };
  let fnName = fn.name;
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = objToQuery(url, paramObj, fn);
  document.body.appendChild(script);
  window[fnName] = function (args) {
    fn(args);
    // 全局变量删除 避免造成内存泄漏
    document.body.removeChild(script);
    delete window[fnName];
  };
}
jsonp("http://localhost:3000/login", {}, function cb(res) {
  console.log(res);
});
// 直接写
let newscript = document.createElement("script");
newscript.src = "http://www.abc.com?callback=fn";
document.body.appendChild(newscript);
function fn(data) {
  console.log(data);
}

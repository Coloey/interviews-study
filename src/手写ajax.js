function ajax(options) {
  //创建一个XHRHttpRequest对象
  const xhr = new XHRHttpRequest();
  //初始化参数内容
  options = options || {};
  options.type = (options || "GET").toUpperCase;
  options.dataType = options.dataType || "json";
  const params = options.data;

  //发送请求
  if (options.type === "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, true);
    xhr.send(params);
  }
  //接收请求
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr, responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
}
ajax({
  type: "post",
  dataType: "json",
  data: {},
  url: "https://xxx",
  success: function (text, xml) {
    console.log(text);
  },
  fail: function (status) {
    console.log(status);
  },
});

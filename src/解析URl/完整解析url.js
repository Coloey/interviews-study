/** 
*@param {string} url 完整的URL地址 
*@returns {object} 自定义的对象 
*@description 用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top'); 
myURL.file='index.html' 

myURL.hash= 'top' 

myURL.host= 'abc.com' 

myURL.query= '?id=255&m=hello' 

myURL.params= Object = { id: 255, m: hello } 

myURL.path= '/dir/index.html' 

myURL.segments= Array = ['dir', 'index.html'] 

myURL.port= '8080' 

myURL.protocol= 'http' 

myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top' 

*/
function parseUrl(url) {
  let a = document.createElement("a");
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(":", ""),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      let res = {},
        params = url.split("?")[1].split("#")[0].split("&");
      for (let i = 0; i < params.length; i++) {
        let [key, value] = params[i].split("=");
        res[key] = value;
      }
      return res;
    })(),
    hash: a.hash.replace("#", ""),
    path: a.pathname.replace(/^([^\/])/, "/$1"), //将第一个非/字符替换为/,'/$1'是替换的目标字符，其中$1表示正则表达式中第一个捕获组
  };
}

//history模式的路由
class Router {
  constructor() {
    this.routes = {};
    this.bindPopState();
  }
  /*pushState() 和 replaceState() 方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了 url，
    但浏览器不会立即向后端发送请求。如果要做到改变 url 但又不刷新页面的效果，就需要前端用上这两个 API。
    */
  init(path) {
    history.replaceState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }
  go(path) {
    /*
    state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state⾥获取
    title：标题，基本没⽤，⼀般传 null
    url：设定新的历史记录的 url。新的 url 与当前 url 的 origin 必须是⼀樣的，否则会抛出错误。
     */
    history.pushState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  _bindPopState() {
    // 监听浏览器前进后退事件，pushState 与 replaceState ⽅法不会触发
    // 切换历史状态：window.history.back(); window.history.forward(); 前进window.history.go(1); 包括forward()、back()、go()三个方法，
    // 对应浏览器的前进，后退，跳转操作。
    window.addEventListener("popstate", (e) => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}
window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector("body");
const ul = document.querySelector("ul");
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route("/", function () {
  changeBgColor("yellow");
});
Router.route("/blue", function () {
  changeBgColor("blue");
});
Router.route("/green", function () {
  changeBgColor("green");
});

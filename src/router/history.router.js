//history模式的路由
class Router{
    constructor(){
        this.routes={};
        this.bindPopState();
    }
    init(path){
        history.replaceState({path:path},null,path)
        this.routes[path]&&this.routes[path]()
    }
    route(path,callback){
        this.routes[path]=callback||function(){}
    }
    go(path){
        history.pushState({path:path},null,path)
        this.routes[path]&&this.routes[path]()
    }
    _bindPopState(){
        window.addEventListener('popstate',e=>{
            const path=e.state&&e.state.path;
            this.routes[path]&&this.routes[path]()
        })
    }
}
window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});


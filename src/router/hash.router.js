//hash模式的路由
class Router{
    constructor(){
        //存储hash与callback键值对
        this.routes={};
        //当前hash
        this.currentUrl="";
        //记录出现过的hash
        this.history=[];
        //作为指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
        this.currentIndex=this.history.length-1;
        this.refresh=this.refresh.bind(this);
        this.backoff=this.backoff.bind(this)
        //默认不是后退操作
        this.isBack=false
        
        window.addEventListener('load',this.refresh,false)
        window.addEventListener('hashchange',this.refresh,false)


    }
    route(path,callback){
        this.routes[path]=callback||function(){}
    }
    refresh(){
        //不能包括'#'
        this.currentUrl=location.hash.slice(1)||'/';
        //不是后退操作
        if(!this.isBack){
            //如果当前指针小于数组总长度，直接截取之前的部分储存下来，避免点击后退按钮后指针后移一位，当再次正常跳转时，指针前进一位，
            //而在数组中添加新hash路由
            //导致指针和路由不匹配
            if(this.currentIndex<this.history.length-1){
                this.history=this.history.slice(0,this.currentIndex+1)

            }
            this.history.push(this.currentUrl)
            this.currentIndex++;
        }
        this.routes[this.currentUrl]()
        this.isBack=false;
    }
    backoff(){
        this.isBack=true
        this.currentIndex<=0
        ?(this.currentIndex=0)
        :(this.currentIndex=this.currentIndex-1)
        //找到后退后的哈希地址
        location.hash=`#${this.history[this.currentIndex]}`
        //调用后退后的地址对应的函数
        this.routes[this.history[this.currentIndex]]
    }

}
window.Router=new Routers()
const content=document.querySelector('body')
const button=document.querySelector('button')
function changeBgColor(color){
    content.style.background=color
}
Router.route('/blue',function(){
    changeBgColor('blue')
})
Router.route('/green',function(){
    changeBgColor('green')
})
Router.route('/red',function(){
    changeBgColor('red')
})
button.addEventListener('click',Router.backoff,false)
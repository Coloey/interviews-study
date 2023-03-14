let myImage=(function(){
    let ImageNode = document.createElement('img')
    document.body.appendChild(ImageNode)
    return function(src){
        ImageNode.src = src
    }
})()

let proxyImage = (function(){
    let img = new Image
    img.onload=function(){
        myImage(this.src)
    }
    return function(){
        myImage('file://C:/Users/sevenaeng/Desktop/loading.jpg')
        img.src=src
    }
})()

proxyImage('http://imgcache.qq.com/music/a.jpg')
//虚拟代理合并http请求
let synchronusFile = function(id){
    console.log('开始同步文件,id为:'+id)
}
let proxySynchronousFile=(function(){
    let cache = [],timer;
    return function(){
        cache.push(id)
        if(timer){
            return;
        }
        timer=setTimeout(function(){
            synchronusFile(cache.join(','))//两秒内向本体发送需要同步的ID集合
            clearTimeout(timer)
            timer=null
            cache.length=0//清空ID集合
        },2000)
    }
})()
let checkbox = document.getElementsByTagName('input')
for(let i=0;c;c=checkbox[i++]){
    c.onclick=function(){
        if(this.checked === true){
            proxySynchronousFile(this.id)
        }
    }
}
//缓存代理计算乘积
let mult =function(){
    let a = 1
    for(let i=0;i<arguments.length;i++){
        a = a*arguments[i]
    }
    return a
}
//缓存代理工厂
let createProxyFactory=function(fn){
    let cache={}
    return function(){
        let args = Array.prototype.join.call(arguments,',')
        if(args in cache){
            return cache[args]
        }
        return cache[args]=fn.apply(this,arguments)
    }
}
let proxyMult = createProxyFactory(mult)
//虚拟代理图片预加载
class PreLoadImage {
    constructor(imgNode){
        //获取真实dom结点
        this.imgNode=imgNode
    }
    //操作img结点的src属性
    setSrc(imgUrl){
        this.imgNode.src=imgUrl
    }
}
class ProxyImage {
    // 占位图url地址
    static LOADING_URL = 'xxx';
    constructor(targetImage){
        // 目标Image 即PreloadImage实例
        this.targetImage=targetImage
    }
    //操作虚拟Image 完成加载
    setSrc(targetUrl){
        this.targetImage.setSrc(ProxyImage.LOADING_URL)
        //创建一个帮我们加载图片的虚拟Image实例
        const virtualImage = new Image()
        virtualImage.onload=()=>{
            this.targetImage.setSrc(targetUrl)
        }
        // 设置src属性 虚拟Image实例开始加载图片
        virtualImage.src = targetUrl
    }
}

const img = document.getElementsByTagName('img')
const preloadImg=new PreLoadImage(img)
const proxyImage=new ProxyImage(preloadImg)
proxyImage.setSrc('http://imgcache.qq.com/music/a.jpg')
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
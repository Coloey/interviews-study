var A={
    Util:{
        util_method1:function(){},
        util_method2:function(){}
        //...
    },
    Tool:{
        tool_method1:function(){},
        tool_method2:function(){}
        //...
    },
    Ajax:{
        get:function(){},
        post:function(){}
        //...
    },
    others:{
        //...
    }

}
A.Util.util_method1()
A.Tool.tool_method1()
A.Ajax.get()
var Conf=(function(){
    var conf={
        MAX_NUM:100,
        MIN_NUM:1,
        COUNT:1000
    }
    //返回取值器对象
    return {
        get: function(name){
            return conf[name]?conf[name]:null;
        }
    }
})()
var count=Conf.get('COUNT')
console.log(count)//1000
var LazySingle=(function(){
    //单例实例引用
    var _instance=null;
    //单例
    function Single(){
        //这里定义私有属性和方法
        return{
            publicMethod:function(){},
            publicProperty:'1.0'
        }
    }
    //获取单例对象接口
    return function(){
        if(!_instance){
            _instance=Single()
        }
        //返回单例
        return _instance

    }
})
console.log(LazySingle().publicProperty);//1.0
//惰性单例
let getSingle=function(fn){
    let res;
    return function(){
        return res || (res = fn.apply(this,arguments))
    }
}
let createLoginLayer = function(){
    let div = document.getElementById('div')
    div.innerHTML = "我是登录浮窗"
    div.style.display='none'
    document.body.appendChild(div)
    return div
}
let createSingleLoginLayer = getSingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function(){
    let loginLayer = createSingleLoginLayer()
    loginLayer.style.display='block'
}
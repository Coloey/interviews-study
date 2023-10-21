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
/*Vue中插件的install为单例模式，比如Vuex
/1. 理解 Vuex 中的 Store

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。 ——Vuex官方文档

当组件非常多、组件间关系复杂、且嵌套层级很深的时候，这种原始的通信方式会使我们的逻辑变得复杂难以维护。这时最好的做法是将共享的数据抽出来、放在全局，供组件们按照一定的的规则去存取数据，保证状态以一种可预测的方式发生变化。于是便有了 Vuex，这个用来存放共享数据的唯一数据源，就是 Store。

2. Vuex如何确保Store的唯一性

我们先来看看如何在项目中引入 Vuex：*/
// 安装vuex插件
Vue.use(Vuex)

// 将store注入到Vue实例中
new Vue({
    el: '#app',
    store
}) 
/*通过调用Vue.use()方法，我们安装了 Vuex 插件。Vuex 插件是一个对象，它在内部实现了一个 install 方法，这个方法会在
插件安装时被调用，从而把 Store 注入到Vue实例里去。也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store*/
let Vue // 这个Vue的作用和楼上的instance作用一样

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
} 
/*通过这种方式，可以保证一个 Vue 实例（即一个 Vue 应用）只会被 install 一次 Vuex 插件，
所以每个 Vue 实例只会拥有一个全局的 Store
思考一下：如果我在 install 里没有实现单例模式，会带来什么样的麻烦？

我们通过上面的源码解析可以看出，每次 install 都会为Vue实例初始化一个 Store。假如 install 
里没有单例模式的逻辑，那我们如果在一个应用里不小心多次安装了插件：*/

// 在主文件里安装Vuex
Vue.use(Vuex)

//...(中间添加/修改了一些store的数据)

// 在后续的逻辑里不小心又安装了一次
Vue.use(Vuex) 

//失去了单例判断能力的 install 方法，会为当前的Vue实例重新注入一个新的 Store，也就是说你中间的那些数据操作全都没了，一切归 0。因此，单例模式在此处是非常必要的。
//注册插件
Vue.use(VueRouter);
//创建路由对象
const router = new VueRouter({
  routes: [{ name: "home", path: "/", component: homeComponent }],
});
// 创建Vue实例，注册router对象
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#apps");

let _Vue = null;
function h() {}
export default class VueRouter {
  //调用install方法，传递Vue构造函数
  static install(Vue) {
    //判断插件是否已经被安装，已经安装就不需要重复安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    // Vue构造函数记录到全局变量中
    _Vue = Vue;
    // 创建Vue实例时传入的router对象注入Vue实例上
    _Vue.mixin({
      //在创建Vue实例的时候
      // 也就是new Vue()的时候，才会有$options这个属性，
      //组件中是没有$options这个属性的。
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          //this表示的就是Vue实例，$options表示的就是在创建Vue的实例的时候传递的选项
          //router 就是 VueRouter 类的实例 init方法就是VueRouter这个类的实例方法,通过原型链找到init方法
          this.$options.router.init();
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    //对data进行响应式监听
    this.data = _Vue.observable({
      current: "",
    });
  }
  //把构造函数中传进来的options参数的路由规则转换为键值对形式存储到routeMap中，键是路由地址，值时对应组件
  createRouteMap() {
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  //创建router-link和router-view组件
  /*
    router-link这个组件最终会被渲染成a标签，同时to作为一个属性，其值会作为a标签中的href属性的值。
    同时还要获取<router-link>这个组件中的文本，作为最终超链接的文本
    */
  initComponents(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      //最终渲染的模板是一个a标签，href属性绑定了to属性的值，同时使用<slot>插槽作为占位符，用具体的文字内容填充该占位符。
      //template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            //当我们单击链接的时候，发现了浏览器进行了刷新操作。表明向服务器发送了请求，
            //而我们单页面应用中是不希望向服务器发送请求。
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
          //阻止向服务器发送请求
          e.preventDefault();
        },
      },
    });
    const self = this;
    Vue.component("router-view", {
      render(h) {
        //根据当前路径从routerMap中找到对应组件
        const component = self.routeMap[self.data.current];
        //将组件转成虚拟DOM
        return h(component);
      },
    });
  }
  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }
  //popstate事件，可以发现浏览器历史操作的变化，记录改变后的地址，单击前进或者是后退按钮的时候触发该事件
  initEvent() {
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}

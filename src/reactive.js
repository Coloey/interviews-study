const targetMap = new WeakMap();
let activeEffect = null;
function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver);//这里用Reflect的原因是修正this指向，相当于target.apply(receiver)
      track(target, key); //if reactive property is Get inside then tarck the effect to rerun on SET,add the effect to the dep
      return res;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let res = Reflect.set(target, key, value, receiver);
      if (res && oldValue != value) {
        trigger(target, key); //if this reactive property has effects to rerun on SET,trigger them
      }
      return res;
    },
  };
  return new Proxy(target, handler);
}
function ref(raw) {
  const r = {
    get value() {
      track(r, "value");
      return raw;
    },
    set value(newval) {
      raw = newval;
      trigger(r, "value");
    },
  };
  return r;
}
let product = reactive({ price: 5, quantity: 2 });
let salePrice = ref(0);
let total = 0;
effect(() => {
  salePrice.value = product.price * 0.9;
});
effect(() => {
  total = salePrice.value * product.quantity;
});
console.log(
  `Before updated quantity total=${total} salePrice=${salePrice.value}`
);
product.quantity = 3;
console.log(
  `After updated quantity total=${total} salePrice=${salePrice.value}`
);
product.price = 10;
console.log(
  `After updated quantity total=${total} salePrice=${salePrice.value}`
);
// Vue2 观察者模式
function observe(target){
  if(target & typeof target === 'object') {
    Object.keys(target).forEach((key) => {
      defineReactive(target, key, target[key])
    })
  }
}
//观察者
class Sub{
  constructor(){
    console.log('observer create')
  }
  update(key,value){
      console.log(`${key}属性变成了了${value}`)
  }
}
//被观察者
class Dep{
  constructor(){
    //初始化订阅队列
    this.subs=[]
  }
  //增加观察者
  addSub(sub){
    this.subs.push(sub)
  }
  //通知观察者
  notify(key,value){
    this.subs.forEach((sub) => {
      if(sub===key){
        sub.update(key,value)
      }
    })
  }
}
function defineReactive(target, key, val){  
  const dep=new Dep()
  //对象递归调用
  observe(val)
  Object.defineProperty(target,key,{
    enumerable: true,
    configurable: false,
    get: function () {
      return val;
    },
    set:function(value){
      //通知观察者
      dep.notify(key,value)
    }
  })
}
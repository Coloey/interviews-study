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
      let res = Reflect.get(target, key, receiver);
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
let product = reactive({ prie: 5, quantity: 2 });
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
function ajax(options) {
  //创建一个XHRHttpRequest对象
  const xhr = new XHRHttpRequest();
  //初始化参数内容
  options = options || {};
  options.type = (options || "GET").toUpperCase;
  options.dataType = options.dataType || "json";
  const params = options.data;

  //发送请求
  if (options.type === "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, true);
    xhr.send(params);
  }
  //接收请求
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr, responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
}
ajax({
  type: "post",
  dataType: "json",
  data: {},
  url: "https://xxx",
  success: function (text, xml) {
    console.log(text);
  },
  fail: function (status) {
    console.log(status);
  },
});

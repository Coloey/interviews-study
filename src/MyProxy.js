const deepClone = require("./cloneDeep");
function MyProxy(obj, handler) {
  let _target = deepClone(obj);
  Object.keys(_target).forEach((key) => {
    Object.defineProperty(_target, key, {
      get: () => handler.get && handler.get(obj, key),
      set: (newVal) => handler.set && handler.set(obj, key, newVal),
    });
  });
  return _target;
}
let person = {
  name: "xiaoxi",
  age: 22,
};
const proxy = new MyProxy(person, {
  get(target, propKey) {
    return target[propKey];
  },
  set(target, propKey, value) {
    target[propKey] = value;
  },
});
console.log(proxy.name);
proxy.name = "hi";
console.log(person.name);

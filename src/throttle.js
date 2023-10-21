//节流:n秒内只运行一次，若在n秒内重复触发，只有一次生效
function throttleed(fn, delay = 500) {
  let oldTime = new Date.now();
  return function (...args) {
    let context = this;
    let newTime = new Date.now();
    if (newTime - oldTime > delay) {
      fn.apply(context, args);
      oldTime = newTime;
    }
  };
}

function throttled1(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (!timer) {
      //n秒内连续触发多次，只执行一次
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null; //只有执行完一次把timer设置为null，才能再次触发
      }, delay);
    }
  };
}

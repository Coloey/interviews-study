//防抖:n秒后再执行该事件，若在n秒内被重复触发，则重新计时
function debounce(fn, delay = 500) {
  let timer;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer); //n秒内只能触发一次,若在n秒内重复触发，则会清除上一轮的timer
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
/* 用闭包的原因：
1 timer不会每次都被初始化，所以clearTimeout有效，这样可以实现跟踪时间间隔和最后
一次执行的时间等信息
2 数据封装:可以隐藏内部状态和逻辑，只暴露一个公共函数，可以避免全局命名冲突，提供更清晰的接口
3 资源利用： 使用闭包，可以避免重复创建计时器或其他资源，闭包内部状态可以被多次调用复用
*/
//立即执行版本：触发事件后函数立即执行，n秒内触发事件不会执行功能函数下一次调用，n秒后再次触发才会再次执行功能函数
function debounce2(fn, delay = 500, immediate) {
  let timer;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      //只有在第一次触发时 会执行函数 在限制时间内多次触发时，都会清除上一次的timer  即把timer变为Null的定时器 
      // 所以n秒内触发事件不会执行功能函数下一次调用 n秒后timer变为null 再执行时会执行
      if (callNow) fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}

// 立即执行版本 第一次立即执行，在wait时间内触发的都不会执行
function debounce(fn, wait) {
  let timer = null;
  let flag = true;
  return function(){
    clearTimeout(timer)
    if(flag) {
      fn.apply(this, arguments);
      flag = false;
    }
    timer = setTimeout(()=>{
      flag=false;
    },wait)
  }
}
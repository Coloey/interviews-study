//防抖:n秒后再执行该事件，若在n秒内被重复触发，则重新计时
function debounce(fn, delay = 500) {
  let timer;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer); //n秒内只能触发一次,若在n秒内重复触发，都会被清除0
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
/* 用闭包的原因：
1 timer不会每次都被初始化，所以clearTimeout有效，这样可以实现跟踪时间间隔和最后
一次执行额时间等信息
2 数据封装:可以隐藏内部状态和逻辑，只暴露一个公共函数，可以避免全局命名冲突，提供更清晰的接口
3 资源利用： 使用闭包，可以避免重复创建计时器或其他资源，闭包内部状态可以被多次调用复用
*/
function debounce2(fn, delay = 500, immediate) {
  let timer;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      immediate = !immediate;
      fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}

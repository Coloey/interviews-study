/*setTimeout实现setInterval原因:
setInterval在每次把任务push到任务队列前 会判断一下上次任务是否还在队列中，如果在
就不会把任务放进队列，这样可能导致某些间隔会被跳过，setTimeout产生的任务会直接push到任务队列
*/
function myInterval(fn, time) {
  let context = this;
  setTimeout(() => {
    fn.call(context);
    myInterval(fn, time);
  }, time);
}
// 间隔时间一定 下一定执行时间离开=上次时间一定
setTimeout(function repeatMe() {
  /* Some long block of code... */
  setTimeout(repeatMe, 10);
}, 10);

setInterval(function () {
  /* Some long block of code... */
}, 10);

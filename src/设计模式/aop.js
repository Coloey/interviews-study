Function.prototype.before = function (beforeFn) {
  // 保存原函数的引用
  const _this = this;
  return function () {
    // 浏览器环境中是window,匿名函数
    console.log(this);
    //先执行新函数,apply修正this
    beforeFn.apply(this, arguments);
    return _this.apply(this, arguments);
  };
};
Function.prototype.after = function (afterFn) {
  const _this = this;
  return function () {
    const res = _this.apply(this, arguments);
    afterFn.apply(this, arguments);
    return res;
  };
};
const fn = function () {
  console.log(2);
};
fn
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  })();

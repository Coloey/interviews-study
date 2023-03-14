//表示状态的三个常量
const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";
class MyPromise {
  constructor(executor) {
    //executor作为执行器，进入立即执行
    //传入resolve和reject方法
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error);
    }
  }
  //存储状态的变量，初始值是pending
  status = PENDING;
  value = null;
  //缓存成功的回调函数
  onFullfilledCallback = [];
  //缓存失败的回调函数
  onRejectedCallback = [];
  resolve = (value) => {
    //状态等待时才执行状态修改
    if (this.status === PENDING) {
      this.status = FULLFILLED;
      //保存修改后的值
      this.value = value;
      //判断成功回调是否存在，存在就调用
      while (this.onFullfilledCallback.length) {
        this.onFullfilledCallback.shift()(value);
      }
    }
  };
  //更改失败后的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };
  then(onFullfilled, onRejected) {
    //实现值穿透，当then中传入的不是函数，实际被解析为then(null),
    //上一个Promise对象的执行结果会穿透到下一个then方法参数中=在then函数里面处理一下，如果传入的不是函数，就将当前的参数包裹为函数
    onFullfilled =
      typeof onFullfilled === "function" ? onFullfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    //支持链式调用，这里创建一个MyPromise，并在后面return,链式调用用微任务，
    const promise2 = new MyPromise((resolve, reject) => {
      const fullfilledMicrotask = () => {
        //创建一个微任务，等待promise2完成初始化
        queueMicrotask(() => {
          try {
            //调用成功的回调，并且把值返回
            const x = onFullfilled(this.value);
            //集中处理x
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            //调用失败的回调，把原因返回,失败也会包裹为一个Promise
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      //判断状态
      if (this.status === FULLFILLED) {
        fullfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        //因为不知道后面状态的变化情况，将成功回调和失败回调存储起来,解决异步问题
        //等到执行成功和失败回调时在传递
        this.onFullfilledCallback.push(fullfilledMicrotask);
        this.onRejectedCallback.push(rejectedMicrotask);
      }
    });
    return promise2;
  }
  //resolve静态方法
  static resolve(parameter) {
    //如果传入MyPromise直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }
  //reject静态方法
  static reject(reason) {
    return new MyPromise((reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    let count = 0;
    let res = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((p, i) => {
        MyPromise.resolve(p)
          .then((value) => {
            res[i] = value;
            count++;
            if (res.length === count) resolve(res);
          })
          .catch(reject);
      });
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let p of promises) {
        MyPromise.resolve(p)
        .then(
          val=>resolve(val),
          err=>reject(err)
        )
      }
    });
  }
  //catch是特殊的then方法,catch后可以继续.then
  static catch(onRejected) {
    return this.then(null, onRejected);
  }
  //不管成功还是失败都会走到finally,并且finally后可以继续.then,并且将值传递给后面的.then
  static finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => {
          return value;
        });
      },
      (err) => {
        return MyPromise.resolve(callback()).then(() => {
          throw err;
        });
      }
    );
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
MyPromise.deferred = function () {
  var result = [];
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};
module.exports = MyPromise;

/*
LazyMan('Hank').sleepFirst(2).eat('dinner').sleep(3).eat('supper')
// 输出:
// //等待2秒..
// Wake up after 2
// Hi This is Hank!
// Eat dinner~
// //等待3秒..
// Wake up after 2
// Eat supper~
*/
//使用任务栈+next
/*class _LazyMan {
  queue = [];
  constructor(name) {
    this.sayName(name);
    setTimeout(() => {
      this.next();
    });
  }
  next() {
    const fn = this.queue.shift();
    fn && fn();
  }
  _holdOn(time) {
    return () => {
      setTimeout(() => {
        console.log(`Wake up after ${time} second`);
        this.next();
      }, time * 1000);
    };
  }
  sayName(name) {
    const fn = () => {
      console.log(`Hi This is ${name}`);
      this.next();
    };
    this.queue.push(fn);
  }
  sleep(time) {
    this.queue.push(this._holdOn(time));
    return this;
  }
  eat(some) {
    const fn = () => {
      console.log(`Eat ${some}`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  }
  sleepFirst(time) {
    this.queue.unshift(this._holdOn(time));
    return this;
  }
}
const LazyMan = (name) => new _LazyMan(name);
//先执行第一轮宏任务 发现没有微任务 继续执行下一轮宏任务即constructor中的setTimeout,将queue中的任务拿出来指向
LazyMan("Hank").sleepFirst(2).eat("dinner").sleep(3).eat("supper");*/
//任务队列+Promise
class _LazyMan2 {
  queue = [];
  constructor(name) {
    this.name = name;
    this.sayName(name);
    Promise.resolve().then(() => {
      let sequence = Promise.resolve();
      this.queue.forEach((item) => {
        sequence = sequence.then(item);
      });
    });
  }
  sayName(name) {
    const fn = () => {
      console.log(`Hi This is ${name}`);
    };
    this.queue.push(fn);
    return this;
  }
  eat(some) {
    const fn = () => {
      console.log(`Eat ${some}`);
    };
    this.queue.push(fn);
    return this;
  }
  _holdOn(time) {
    return () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${time} second`);
          resolve();
        }, time * 1000);
      });
  }
  sleep(time) {
    this.queue.push(this._holdOn(time));
    return this;
  }
  sleepFirst(time) {
    this.queue.unshift(this._holdOn(time));
    return this;
  }
}
const LazyMan = (name) => new _LazyMan2(name);
//LazyMan("Hank").sleepFirst(2).eat("dinner").sleep(3).eat("supper");
// 任务队列和async
class _LazyMan3 {
  queue = [];
  constructor(name) {
    this.name = name;
    this.sayName(name);
    setTimeout(async () => {
      for (let todo of this.queue) {
        await todo();
      }
    });
  }
  sayName(name) {
    const fn = () => {
      console.log(`Hi This is ${name}`);
    };
    this.queue.push(fn);
  }
  eat(some) {
    const fn = () => {
      console.log(`Eat ${some}`);
    };
    this.queue.push(fn);
    return this;
  }
  _holdOn(time) {
    return () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${time} second`);
          resolve();
        }, time * 1000);
      });
  }
  sleep(time) {
    this.queue.push(this._holdOn(time));
    return this;
  }
  sleepFirst(time) {
    this.queue.unshift(this._holdOn(time));
    return this;
  }
}
const LazyMan3 = (name) => new _LazyMan3(name);
LazyMan3("Hank").sleepFirst(2).eat("dinner").sleep(3).eat("supper");

let urls = ["1", "2", "3", "4", "5", "6", "7"];
let pool = []; //并发池
let max = 3; //最大并发数量
// 自定义请求函数
function request(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
      console.log(`任务${url}完成`);
    }, 1000);
  }).then((res) => {
    console.log("外部逻辑", res);
  });
}
//非Promise.race()
/*function addTask(url) {
  let task = request(url);
  pool.push(task);
  task.then((res) => {
    //请求结束将Promise任务从pool中移除
    pool.splice(pool.indexOf(task), 1);
    console.log(`${url}结束，当前并发数:${pool.length}`);
    url = urls.shift();
    //并发池跑完一个任务再塞入一个任务
    if (url !== undefined) {
      addTask(url);
    }
  });
}
while (pool.length < max) {
  let url = urls.shift();
  addTask(url);
}*/
//Promise.race()实现
function addTask(url) {
  let task = request(url);
  pool.push(task);
  task.then((res) => {
    //请求结束将Promise任务从pool中移除
    pool.splice(pool.indexOf(task), 1);
    console.log(`${url}结束，当前并发数:${pool.length}`);
  });
}
function run(task) {
  task.then((res) => {
    let url = urls.shift();
    if (url !== undefined) {
      addTask(url);
      run(Promise.race(pool));
    }
  });
}
while (pool.length < max) {
  let url = urls.shift();
  addTask(url);
}
let race = Promise.race(pool);
run(race);
//Promise+async...await
/*async function fn() {
  for (let i = 0; i < urls.length; i++) {
    let task = request(urls[i]);
    //请求结束将Promise任务从pool中移除
    task.then((res) => {
      pool.splice(pool.indexOf(task), 1);
      console.log(`${urls[i]}结束，当前并发数:${pool.length}`);
    });
    pool.push(task);
    //并发池塞满后需要等待一个task完成才可以继续往里面塞任务
    if (pool.length === max) {
      await Promise.race(pool);
    }
  }
  //执行完所有任务才返回结果
  await Promise.allSettled(pool);
}
fn();*/

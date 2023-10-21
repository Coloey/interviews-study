const countDown = (time) => {
  const now = Date.now();
  let timer;
  if (timer) clearTimeout(timer);
  if (time <= 0) return;
  const diffTime = Math.floor((now - this.currTime) / 1000);
  this.currTime = now;
  timer = setTimeout(() => {
    console.log(time);
    countDown(time - diffTime);
  }, 1000);
};
countDown(5000);
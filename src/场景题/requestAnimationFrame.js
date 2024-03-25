const requestAnimationFrame = (callback) => {
  let lastTime = new Date().getTime();
  let vendors = ["webkit", "moz"];
  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[i] + "CancelAnimationFrame"] ||
      window[vendors[i] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      let id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
};
const cancelAnimationFrame = (id) => {
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
};

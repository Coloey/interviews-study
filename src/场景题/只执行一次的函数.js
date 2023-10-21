function once(func) {
  let res;
  return function () {
    if (!res) {
      func.apply(null, arguments);
    }
    return res;
  };
}
function cb() {
  return 1;
}
const getLog = once(cb);

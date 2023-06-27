// counter.js
import { message } from "./index.mjs";

const count = 5;
// 没有setTimeout报错
setTimeout(() => {
  console.log(message);
}, 0);

export { count };

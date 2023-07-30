//计算二进制数中1的个数
const countBinary = (num) => {
  let res = 0;
  while (num > 0) {
    if (num & 1) {
      res++;
    }
    num = num >> 1;
  }
  return res;
};

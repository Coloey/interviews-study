function add(str1, str2) {
  str1=str1.split('')
  str2=str2.split('')
  let flag = 0;
  let res = "";
  while(str1.length || str2.length || flag) {//最后前面都消费完后如果flag还等于1进位
    let n1 = parseInt(str1.pop()) || 0;
    let n2 = parseInt(str2.pop()) || 0
    let temp = n1+n2+flag;
    //获取下一个进位
    flag = Math.floor(temp / 10);
    res = (temp % 10) + res;
  }
  return res;
}
console.log(add("9999999999999999", "1"));

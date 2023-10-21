function ipToNumber(ip) {
  var num = 0;
  if (ip == "") {
    return num;
  }
  var aNum = ip.split(".");
  if (aNum.length != 4) {
    return num;
  }
  num += parseInt(aNum[0]) << 24;
  num += parseInt(aNum[1]) << 16;
  num += parseInt(aNum[2]) << 8;
  num += parseInt(aNum[3]) << 0;
  num = num >>> 0; //这个很关键，不然可能会出现负数的情况
  return num;
}
/*
parseInt(10, 2)：

第一个参数是要转换的字符串，这里是 "10"。
第二个参数是进制数，这里是 2，表示要将字符串解析为二进制数字。
结果是将字符串 "10" 解析为二进制数，所以返回的是 2。
parseInt(10).toString(2)：

parseInt(10) 将数字 10 解析为整数。
toString(2) 将整数转换为指定进制的字符串，这里是将整数 10 转换为二进制字符串。
结果是将数字 10 转换为二进制字符串，所以返回的是 "1010"。
*/
function ipToNumber2(ipv4){
  const arr=ipv4.split('.')
  const binaryArr = arr.map((item)=>{
    return ('00000000' + parseInt(item).toString(2)).slice(-8)
  })
  return parseInt(binaryArr.join(''),2)
}

function numberToIp(number) {
  var ip = "";
  if (number <= 0) {
    return ip;
  }
  var ip3 = (number << 0) >>> 24;
  var ip2 = (number << 8) >>> 24;
  var ip1 = (number << 16) >>> 24;
  var ip0 = (number << 24) >>> 24;

  ip += ip3 + "." + ip2 + "." + ip1 + "." + ip0;

  return ip;
}

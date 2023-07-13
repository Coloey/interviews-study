function fn1(length){
    let res=Math.random()// 生成随机数字
        .toString(36)// 转成36进制 
        .slice(-length)//截取最后length位
    return res
}
function fn(a) {
    console.log(a);//f a(){}
    var a = 2;
    function a() { }
    console.log(a);//2
  }
  fn(1);
//函数声明提升优先于变量声明的提升，即放到变量声明的上方。上面代码等价于：
var a = 1;

(function() {
  function a() { }
  
  console.log(a);
  a = 2;
  console.log(a);
})();
//这里函数声明做了提升，跑到最顶部。接下来考虑给 var a = 2 做提升。但我们的函数 a 的声明已经提升了，所以这里的 var 算是重复声明了，直接去掉 var，最终得到上述代码。
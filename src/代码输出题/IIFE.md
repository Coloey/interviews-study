IIFE特点:
1.表达式中的变量不能从外部访问
2.将IIFE分配给一个变量，不是存储IIFE本身，而是存储IIFE执行后返回的结果
```js
var result =(function(){
    var name="Berry"
    return name
})()
result;//'Berry'
```
IIFE和闭包的结合使用
ES5没有块作用域的影响：
```js
var arr = [];
    for (var i=0;i<3;i++){
      arr[i] = function () {
        return i;
      };
    }
    console.log(arr[0]());
    console.log(arr[1]());
    console.log(arr[2]());//3,3,3
```
```js
var arr = [];
    for (var i=0;i<3;i++){
      arr[i] = function () {
        return i;
      };
    }
    console.log(arr[0]);   //修改的地方，去掉了()
    console.log(arr[1]);   //修改的地方，去掉了()
    console.log(arr[2]);   //修改的地方，去掉了()
```
打印：
```
f(){return i;}
f(){return i;}
f(){return i;}
```
ES5没有块作用域,for循环条件中定义的变量i实际上是一个全局变量，这个i会随着for的执行，不断被覆写，直到i变为3,当页面加载完来执行 arr[0]() 函数时，arr[0]() 中待命的 i 会找 i 的最终结果，所以最后打印出来的是3，3，3。
IIFE+闭包：
```js
var arr=[]
for(var i=0;i<3;i++){
    (function(i){
        arr[i]=function(){
            return i;
        }
    })(i)
}
```
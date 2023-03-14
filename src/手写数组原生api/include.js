//include 内部,可以判断NAN
Array.prototype.myInclude=function(target,start=0){
    let arr=this
    let len=arr.length
    let _start=start > 0 ? start : Math.abs(start)<len ? start+len : 0
    function isSame(x,y){
        return x===y || x!==x && y!==y
    }
    for(;_start<len;_start++){
        if(isSame(arr[_start],target)){
            return true
        }
    }
    return false
}
//iife实现
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
//解答：
data[i]=(function (i) {
    return function () { 
      console.log(i);
    };
  }) (i)
  
  
(function(j){
	arr[j]=function(){
		console.log(j)
	}
}(i))




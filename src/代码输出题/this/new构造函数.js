var obj = { 
    name : 'cuggz', 
    fun : function(){ 
      console.log(this.name); 
    } 
  } 
  obj.fun()     // cuggz
  new obj.fun() // undefined
  //使用new构造函数时，其this指向的是全局环境window。
  //this绑定的优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定
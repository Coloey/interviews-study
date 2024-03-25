//写一个类，有一个this.z=[1,2,3,4,5] 有一个方法sayHello，要求obj.sayHello调用一次打印1，再调用一次打印2..
class Hello{
    constructor(){
       this.z=[1,2,3,4,5]
       this.idx=0;
    }
    sayHello(){
        if(this.idx<this.z.length){
            console.log(this.z[this.idx++])
        }else {
            console.log(undefined)
        }
    }
  }
  
const obj=new Hello()
obj.sayHello()
obj.sayHello()
//图片轮播类
var LoopImages=function(ImgArr,container){
    this.ImgArr=ImgArr;//轮播图片数组
    this.container=container//轮播图片容器
}
LoopImages.prototype={
    //创建轮播图片
    createImg:function(){
        console.log('LoopImages createImage function')

    },
    changeImage:function(){
        console.log('LoopImages changeImage function')
    }
}
//上下切换滑动类
var SlideLoopImg=function(imgArr,container){
    //构造函数继承图片轮播类
    LoopImages.call(this,imgArr,container)
}
SlideLoopImg.prototype=new LoopImages()
//重写继承的切换下一张图片的方法
SlideLoopImg.prototype.changeImage=function(){
    console.log('SlideLoopImage changeImage function')
}
//渐隐切换类
var FadeLoopImg=function(imgArr,container,arrow){
    LoopImages.call(this,imgArr,container)
    this.arrow=arrow
}
FadeLoopImg.prototype=new LoopImages()
FadeLoopImg.prototype.changeImage=function () {
    console.log('FadeLoopImage changeImage function')
}
function prototypeExtend(){
    var F=function () {  },//缓存类，为实例化返回对象临时创建
    args=arguments,//模板对象参数序列
    i=0,
    len=args.length;
    for(;i<len;i++){
        //遍历每个模板对象中的属性
        for(var j in args[i]){
            //将这些属性复制到缓存类原型中
            F.prototype[j]=args[i][j]
        }
    }
    //返回缓存类的一个实例
    return new F()
}
var penguin=prototypeExtend(
    {
        speed:20,
        swim:function(){
            console.log('游泳速度'+this.speed)
        }
    },
    {
        run:function(speed){
            console.log('跑步速度'+speed)
        }
    },
    {
        jump:function(){
            console.log('跳跃动作')
        }

    }

)
penguin.swim();//游泳速度 20
penguin.run(10)//奔跑速度 10
penguin.jump()//跳跃动作
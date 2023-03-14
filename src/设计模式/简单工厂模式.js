//蓝球基类
var Basketball=function(){
    this.intro="篮球"
}
Basketball.prototype={
    getMember:function(){
        console.log('每个队伍5名队员')
    },
    getBallSize:function(){
        console.log('蓝球很大')
    }
}
//足球基类
var Football=function(){
    this.intro='足球'
}
Football.prototype={
    getMember:function(){
        console.log('每个队伍需要11名队员')
    },
    getBallSize:function(){
        console.log('租足球很大')
    }
}
//运动工厂
var SportFactory=function(name){
    switch(name){
        case 'NBA':
            return new Basketball();
        case 'wordCup':
            return new Football()
    }
}
//为世界杯创建一个足球，只需要记住运动工厂，调用并创建
var football=SportFactory('wordCup')
console.log(football)
console.log(football.intro)
football.getMember()

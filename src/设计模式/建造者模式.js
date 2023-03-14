//创建以为人类
var Human=function(param){
    this.skill=param&&param.skill||'保密';
    this.hobby=param&&param.hobby||'保密'
}
//类人原型方法
Human.prototype={
    getSkill:function(){
        return this.skill
    },
    getHobby:function(){
        return this.hobby
    }
}
//实例化姓名类
var Named=function(name){
    var that=this
    //构造器
    //构造函数解析姓名的姓与名
    (function(name,that){
        that.wholeName=name
        if(name.indexOf(' ')>-1){
            that.FirstName=name.splice(0,name.indexOf(' '))
            that.SecondName=name.splice(name.indexOf(' '))
        }
    })(name,that)
}
//实例化职位类
var Work=function(work){
    var that=this
    (function(work,that){
        switch(work){
            case 'code':
                that.work='工程师';
                that.workDescript='每天沉迷于编程'
                break;
            case 'UI':
            case 'UE':
                that.work='设计师';
                that.workDescript='设计是一种艺术'
                break;
            case 'teacher':
                that.work='教师';
                that.workDescript='分享是一种快乐'
                break;
            default:
                that.work=work
                that.workDescript='对不起，无您选择的职位'
        }
    })(work,that)
}
//更好期望的职位
Work.prototype.changeWork=function(work){
    this.work=work
}
Work.prototype.changeDescript=function(sentecnce){
    this.workDescript=sentecnce
}
//应聘者建造者
//参数 name work
var Person=function(name,work){
    //创建应聘者缓存对象
    var _person=new Human()
    //创建应聘者姓名解析对象
    _person.name=new Named(name)
    //创建应聘者工作解析对象
    _person.work=new Work(work)
    return _person
}
var person=new Person('xiao ming','code')
console.log(person.skill)//保密
console.log(person.name.FirstName)//xiao
console.log(person.work.work)//工程师

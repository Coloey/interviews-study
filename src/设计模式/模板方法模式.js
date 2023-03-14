//模板类 基础提示框data渲染数据
var Alert=function(data){
    if(!data)return;
    //设置内容
    this.content=data.content;
    //创建提示面板
    this.panel=document.createElement('div');
    //创建内容提示组件
    this.contentNode=document.createElement('p');
    //创建确定按钮组件
    this.confirmBtn=document.createElement('span');
    //创建关闭按钮组件
    this.closeBtn=document.createElement('b');
    //为提示面板添加类
    this.panel.className='alert';
    //为关闭按钮添加类
    this.closeBtn.className='a-close';
    //为确定按钮添加类
    this.confirmBtn.className='a-confirm';
    //为确定按钮添加文案
    this.confirmBtn.innerHTML=data.confirm||'确认'
    //为提示内容添加文本
    this.contentNode.innerHTML=this.content;
    //点击确定按钮执行方法 如果data中有success方法则为success方法，否则为空函数
    this.success=data.success||function(){};
    //点击关闭按钮执行方法
    this.fail=data.fail||function(){}
}
Alert.prototype={
    init:function(){
        //生成提示框
        this.panel.appendChild(this.closeBtn);
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.confirmBtn);
        //插入页面
        document.body.appendChild(this.panel);
        //绑定事件
        this.bindEvent();
        //显示提示框
        this.show();
    },
    bindEvent:function(){
        var me=this;
        //关闭按钮点击事件
        this.closeBtn.onclick=function(){
            me.fail();
            //隐藏弹层
            me.hide()
        }
        //确认按钮点击事件
        this.confirmBtn.onclick=function(){
            me.success();
            me.hide();
        }
        
    },
    hide:function(){
        this.panel.style.display='none'
    },
    //显示弹层
    show:function(){
        this.panel.style.display='block'
    }

}
//右侧按钮提示框
var RightAlert=function(data){
    //继承基本提示框构造函数
    Alert.call(this,data);
    //为确认按钮添加right类
    this.confirmBtn.className=this.confirmBtn.className+'right'
}
//继承基本提示框方法
RightAlert.prototype=new Alert();
//标题提示框
var TitleAlert=function(data){
    Alert.call(this,data);
    this.title=data.title;
    this.titleNode=document.createElement('h3');
    this.titleNode.innerHTML=this.title
}
TitleAlert.prototype=new Alert();
//对基本提示框创建方法的拓展
TitleAlert.prototype.init=function(){
    //插入标题
    this.panel.insertBefore(this.titleNode,this.panel.firstChild);
    //继承基本提示框的init方法
    Alert.prototype.init.call(this)
}
//带有取消按钮的弹出框
var CancleAlert=function(data){
    //继承标题提示框构造函数
    TitleAlert.call(this,data)
    //取消按钮文案
    this.cancel=data.cancel;
    //创建取消按钮
    this.cancelBtn=document.createElement('span');
    //为取消按钮添加类
    this.cancelBtn.className='cancel'
    //设置取消按钮内容
    this.cancelBtn.innerHTML=this.cancel||'取消'

}
//继承标题提示框原型方法
CancleAlert.prototype=new Alert()
CancleAlert.prototype.init=function(){
    //继承标题提示框创建方法
    TitleAlert.prototype.init.call(this);
    //由于取消按钮要添加在末尾，所以在创建完其他组件后添加
    this.panel.appendChild(this.cancelBtn)
}
CancleAlert.prototype.bindEvent=function(){
    var me=this;
    //标题提示框绑定事件方法继承
    TitleAlert.prototype.bindEvent.call(me);
    //取消按钮绑定事件
    this.cancelBtn.onclick=function(){
        me.fail();
        me.hide();
    }
}
new CancleAlert({
    title:'提示标题',
    cancle:'提示内容',
    success:function(){
        console.log('ok')
    },
    fail:function(){
        console.log('cancel')
    }
}).init()
let Beverage = function(param){
    let boilWater = function(){
        console.log("把水煮沸")
    }
    let brew = param.brew || function(){
        throw new Error('必须传递brew方法')
    }
    let pourInCup = param.pourInCup || function(){
        throw new Error('必须传递pourInCup方法')
    }
    let  addCondiments = param.addCondiments || function(){
        throw new Error('必须传递addCondiments方法')
    }
    let F = function(){}
    F.prototype.init = function(){
        boilWater()
        brew()
        pourInCup()
        addCondiments()
    }
    return F;
}
let Coffee = Beverage({
    brew:function(){
        console.log('用沸水冲泡咖啡')
    },
    pourInCup:function(){
        console.log('把咖啡倒进杯子')
    },
    addCondiments:function(){
        console.log('加糖和牛奶')
    }
})
let coffee = new Coffee()
coffee.init()
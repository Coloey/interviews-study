function addEvent(dom,type,fn){
    //支持DOM2的事件处理程序addEventListener方法的浏览器
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
        //对于addEventListener方法但支持attachEvent方法的浏览器
    }else if(dom.attachEvent){
        dom.attachEvent('on'+type,fn)
        //对于不支持addEventListener方法也不支持attachEvent方法，但支持'on+事件名'的浏览器
    }else{
        dom['on'+type]=fn
    }
}
//获取事件对象
var getEvent=function(event){
    return event||window.event
}
//获取元素
var getTarget=function(event){
    var event=getTarget(event)
    //标准浏览器下event.target，IE下event.srcElement
    return event.target||event.srcElement

}
//阻止默认行为
var preventDefault=function(event){
    var event=getEvent(event)
    //标准浏览器
    if(event.preventDefault){
        event.preventDefault()
        //IE浏览器
    }else{
        event.returnValue=false;
    }
};

addEvent(myInput,'click',function(e){
    preventDefault(e)
    //获取事件源目标对象
    if(getTarget(e)!==document.getElementById('myInput')){
        hideInputSug()
    }
})
var A={
    //通过id获取元素
    g:function(id){
        return document.getElementById(id)
    },
    //设置元素css属性
    css:function(id,key,value){
        document.getElementById(id).style[key]=value
    },
    //设置元素的属性
    attr:function(id,key,value){
        document.getElementById(id)[key]=value
    },
    html:function(){
        document.getElementById(id).innerHTML=html
    },
    //为元素绑定事件
    on:function(){
        document.getElementById(id)['on'+type]=fn
    }
}
A.css('box','background','red')//设置css样式
A.attr('box','className','box')//设置class
A.html('box','这是新添加嗯嗯内容')//设置内容
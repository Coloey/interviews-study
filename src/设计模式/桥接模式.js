//抽象处公共部分
function changeColor(dom,color,bg){
    //设置元素的字体颜色
    dom.style.color=color
    //设置元素的背景颜色
    dom.style.background=bg
}
var spans=document.getElementsByTagName('span')
spans[0].onmouseover=function(){//匿名函数作为回调函数作为桥接方法，解除this和事件之间的耦合，changeColor方法中的dom实质上是事件回调函数中的this
    changeColor(this,'red','#ddd')
}
spans[0].onmouseout=function(){
    changeColor(this,'#333','#f5f5f5')
}
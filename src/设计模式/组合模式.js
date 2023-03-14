/*function inheritPrototype(subType,superType){
    let prototype=Object.create(superType.prototype)
    prototype.constructor=subType;
    subType.prototype=prototype
}
var Form=function(){
    //子组件容器
    this.children=[]
    //当前组件元素
    this.element=null;
}
Form.prototype={
    init:function(){
        throw new Error('请重写方法')
    },
    add:function () {
        throw new Error('请重写方法')
    },
    getElement:function(){
        throw new Error('请重写方法')
    }
}
var FormItem =function(id,parent){
    //构造函数继承父类
    Form.call(this)
    this.id=id;
    this.parent=parent;
    this.init()
}
inheritPrototype(FormItem,Form)
.prototype.init=function(){
    this.element=document.createElement('ul')
    this.element.id=this.id;
    this.element.className='new-container'
}
//添加子元素方法
FormItem.prototype.add=function(child){
    //在子元素容器中插入子元素
    this.children.push(child);
    //插入当前组件的元素树
    this.element.appendChild(child.getElement())
    return this;

}
//获取当前元素方法
FormItem.prototype.getElement=function(){
    return this.element;
}
//显示方法
FormItem.prototype.show=function(){
    this.parent.appendChild(this.element)
}
var FieldsetItem=function(classname,name){
    Form.call(this);
    this.classname=classname||'';
    this.name=name||''
    this.init();

}
inheritPrototype(FieldsetItem,Form);
FieldsetItem.prototype.init=function(){
    this.element=document.createElement('li');
    this.element.className=this.classname
}
FieldsetItem.prototype.add=function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement());
    return this;
}
FieldsetItem.prototype.getElement=function(){
    return this.element;
}
var Group=function(){
    Form.call(this);
    this.init();
}
inheritPrototype(Group,Form);
Group.prototype.init=function(){
    this.element=document.createElement('div')
}
Group.prototype.add=function(child){
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}
Group.prototype.getElement=function(){
    return this.element;
}
var LabelItem=function(classname,text){
    Form.call(this);
    this.classname=classname||'';
    this.text=text||'';
    this.init()

}
inheritPrototype(LabelItem,Form)
LabelItem.prototype.init=function(){
    this.element=document.createElement('p');
    this.element.innerHTML=this.text;
    this.element.className=this.classname
}
LabelItem.prototype.add=function(child){
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}
LabelItem.prototype.getElement=function(){
    return this.element;
}
var InputItem=function(classname){
    Form.call(this);
    this.classname=classname;
    this.init();

}
inheritPrototype(InputItem,Form)
InputItem.prototype.init=function(){
    this.element=document.createElement('input');
    this.element.className=this.classname;

}
InputItem.prototype.add=function(child){
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;

}
InputItem.prototype.getElement=function(){
    return this.element;
}
var SpanItem=function (text) {
    Form.call(this);
    this.text=text;
    this.init();
}
inheritPrototype(SpanItem,Form)
SpanItem.prototype.init=function(){
    this.element=document.createElement('span');
    this.element.innerHTML=this.text;
    this.element.className=this.classname;
}
SpanItem.prototype.getElement=function(){
    return this.element;
}
*/

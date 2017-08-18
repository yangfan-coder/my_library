/*
	编写自己的一个库类文件
	2017-8-3
	 --This
 */

// 每次定义的时候new一个新的对象
var $ = function (_this){
	return new Base(_this);
}

// 定义一个对象
function Base(_this){
	this.elements = [];			// 存放节点的数组 ==>私有化
	if(_this != undefined) {	// _this or undefined is objct,跟typeof返回的字符串不用，谨记
		this.elements[0] = _this;
	}
};

/*
 定义原型的API
*/

// 查找id节点
Base.prototype.GetId = function (id){
	this.elements.push(document.getElementById(id))
	return this;	
}

// 查找name节点
Base.prototype.GetName = function (name,parents){
	var node = null;
	if(arguments.length == 2) {
		node = document.getElementById(parents);
	}else {
		node = document;
	}
	var nameList = node.getElementsByTagName(name);
	for(var i = 0;i <nameList.length; i++){
		this.elements.push(nameList[i]);
	}
	return this;	
}

// 查找class节点
Base.prototype.GetClass = function (cls,parents){
	var node = null;
	if(arguments.length == 2) {
		node = document.getElementById(parents);
	}else {
		node = document;
	}
	var lis = node.getElementsByTagName("*");
	var re = RegExp("\\b" + cls + "\\b")			//只有原始的对象才可以传入参数，这也就是跟简写方式最大的不同；
	for( var i = 0; i< lis.length; i++){

		if( re.test(lis[i].className)){
			this.elements.push(lis[i]);
		}
	}
	return this;
}

// 查找某一个节点
Base.prototype.eq = function(mun){
	var element = this.elements[mun];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

// 添加link或style的css规则
Base.prototype.addRule = function(mun,selectorText,cssText,position){
	var sheet = document.styleSheets[mun];
	insertRule(sheet,selectorText,cssText,position);
	return this;
}

// 移除link或style的css规则
Base.prototype.removeRule = function(mun,index){
	var sheet = document.styleSheets[mun];
	deleteRule(mun,index);
	return this;
}

/*
	定义方法
 */

// css 操作方法
Base.prototype.css = function(attr,val){
	for(var i = 0; i<this.elements.length; i++){
		if(arguments.length == 1) {
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = val;
	}
	return this;
}

// html 操作方法
Base.prototype.html = function(value){
	for(var i = 0; i<this.elements.length; i++){
		if(arguments.length == 0) {
			 return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = value;
	}
	return this;
}
// click 操作方法
Base.prototype.click = function(fn){
	for(var i = 0; i<this.elements.length; i++){
		this.elements[i].onclick = fn;
	}
	return this;
}

// 添加class
Base.prototype.addClass = function(className){
	for( var i = 0 ;i <this.elements.length; i++){
		if(!hasClass(this.elements[i],className) )
		this.elements[i].className += " " +className;
	}
	return this;
}

// 移除class
Base.prototype.removeClass = function(className){
	for( var i = 0 ;i <this.elements.length; i++){
		if(hasClass(this.elements[i],className))
		this.elements[i].className = this.elements[i].className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)"),"")
	}
	return this;
}

// 移入移除 hover
Base.prototype.hover = function(over,out){
	for( var i = 0 ;i <this.elements.length; i++){
		addEvent(this.elements[i],"mouseover",over);
		addEvent(this.elements[i],"mouseout",out);
	}
}

// 显示 show
Base.prototype.show = function(){
	for( var i = 0 ;i <this.elements.length; i++){
		this.elements[i].style.display = "block";
	}
	return this;
}

// 隐藏 hide
Base.prototype.hide = function(){
	for( var i = 0 ;i <this.elements.length; i++){
		this.elements[i].style.display = "none";
	}
	return this;
}

// 设置div上下左右居中 center
Base.prototype.center = function (w,h){
	var L = (getInner().width- w) /2 ;
	var T = (getInner().height - h) /2 ;
	for( var i = 0 ;i <this.elements.length; i++){
		this.elements[i].style.left = L +"px";
		this.elements[i].style.top = T + "px";
	}
	return this;
}

// 触发浏览器窗口 onresize
Base.prototype.resize = function(fn){
	for( var i = 0 ;i <this.elements.length; i++){
		var element = this.elements[i];
		addEvent(window,"resize",function(){
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth + "px";
				
			}
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + "px";
			}
		})
	}
	return this;
}

// 遮罩层的look
Base.prototype.look = function(){
	for( var i = 0 ;i <this.elements.length; i++){
		this.elements[i].style.display = 'block';
		this.elements[i].style.width = getInner().width + "px";
		this.elements[i].style.height = getInner().height + "px";
		addEvent(window,"scroll",scrollTop);
	}
	return this;
};

// 关闭遮罩层的unlook
Base.prototype.unlook = function(){
	for( var i = 0 ;i <this.elements.length; i++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
		removeEvent(window,"scroll",scrollTop);
	}
	return this;
};


// // 拖拽
// Base.prototype.drag = function(obj){
	
// 	return this;
// }
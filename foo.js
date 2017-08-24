/*
	编写自己的一个库类文件
	2017-8-3
	 --This
 */

// 每次定义的时候new一个新的对象
var $ = function (ages){
	return new Base(ages);
}

// 定义一个对象
function Base(ages){
	this.elements = [];					// 存放节点的数组 ==>私有化
	if(typeof ages == "string"){
		switch (ages.charAt(0)) {
			case "#":
				this.elements.push(this.GetId(ages.substring(1)))
				break;
			case ".":
				this.elements = this.GetClass(ages.substring(1))
				break;
			default:
				this.elements = this.GetName(ages);
				break;
		}

	}else if(typeof ages == "object"){

		if(ages != undefined) {		// ages or undefined is objct,跟typeof返回的字符串不用，谨记
			this.elements[0] = ages	;
		}
	}
};

/*
 定义原型的API
*/


// 查找id节点
Base.prototype.GetId = function (id){
	return document.getElementById(id);
}

// 查找name节点
Base.prototype.GetName = function (name,parentNode){
	var node = null;
	var result = [];

	if(parentNode != undefined) {
		node = parentNode;
	}else {
		node = document;
	}

	var nameList = node.getElementsByTagName(name);
	for(var i = 0;i <nameList.length; i++){
		result.push(nameList[i]);
	}

	return result;
}

// 查找class节点
Base.prototype.GetClass = function (cls,parentNode){
	var node = null;
	var result = [];

	if(parentNode != undefined) {
		node = parentNode;
	}else {
		node = document;
	}
	var lis = node.getElementsByTagName("*");
	var re = RegExp("\\b" + cls + "\\b")			//只有原始的对象才可以传入参数，这也就是跟简写方式最大的不同；
	for( var i = 0; i< lis.length; i++){

		if( re.test(lis[i].className)){
			result.push(lis[i]);
		}
	}
	return result;
}

// 查找某一个节点，并返回这个节点对象
Base.prototype.getElement = function(mun){
	return this.elements[mun];
}

// 查找某一个节点，并且返回Base对象
Base.prototype.eq = function(mun){
	var element = this.elements[mun];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

// 设置css选择期的子节点
Base.prototype.find = function(str){
	var result = []; // 临时变量
	for(var i = 0; i<this.elements.length; i++){
		if(typeof str == "string"){
			switch (str.charAt(0)) {
				case "#":
					result.push(this.GetId(str.substring(1)))
					break;
				case ".":
					var all = this.GetClass(str.substring(1),this.elements[i]);
					var j = 0;
					while ( j < all.length) {
						result.push(all[j])
						j++;
					}
					break;
				default:
					var temps = this.GetName(str,this.elements[i]);
					var j = 0;
					while ( j < temps.length) {
						result.push(temps[j])
						j++;
					}
					break;
			}
		}
	}
	this.elements = result;
	return this;
};

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

// 插件的入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
};


/*
	封装函数库

 */

// 添加事件的绑定
var addEvent = function (obj,type,fn){
	if(typeof obj.addEventListener != "undefined"){	//w3c
		obj.addEventListener(type,fn,false);
	}else{
		// 创建一个存放事件的哈希表
		if(!obj.events) obj.events = {};
		// 第一次执行
		if(!obj.events[type]){
			// 创建一个存放事件处理函数的数组
			obj.events[type] = [];
			// 把第一次的事件处理函数先存储到第一个位置
			if(obj["on" + type]) obj.events[type][0] = fn;
		}else {
			if(addEvent.equal(obj.events[type],fn)) return false;
		}
		// 第二次 用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		// 执行函数
		obj["on"+type] = addEvent.exec;
		
	}
}
addEvent.ID = 1;
addEvent.exec = function(event){
	var e = event || addEvent.fiexEvent(window.event);
	var es = this.events[e.type]
	for(var i in es){
		es[i].call(this,e);
	}
}

// 同一个注册函数进行屏蔽
addEvent.equal = function (es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
}
// 把IE常用的event对象配对到w3c中去
addEvent.fiexEvent = function (event){
	event.preventDefault = addEvent.fiexEvent.preventDefault;
	event.stopPropagation = addEvent.fiexEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}

// IE阻止默认行为
addEvent.fiexEvent.preventDefault = function(){
	this.returnValue = false;
}
// IE取消时间冒泡
addEvent.fiexEvent.stopPropagation = function(){
	this.cancelBubble = true;
}

// 删除事件的绑定
var removeEvent = function(obj,type,fn){
	if(typeof obj.removeEventListener !="undefined"){
		obj.removeEventListener(type,fn,false);
	}else {
		if(obj.events){
			for( var i in obj.events[type]) {
				if(obj.events[type][i] == fn) {
					delete obj.events[type][i];
				}
			}
		}
	}
}

// 跨浏览器获取视口大小
var getInner = function(){
	if(typeof window.innerWidth != "undefined"){	// FF w3c
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else {			// IE
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

// 设置获取css的样式
var getStyle = function (element,attr){
	if(typeof window.getComputedStyle != "undefined") {	// w3c
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != "undefined") { // ie
		return element.currentStyle[attr];
	}
}

// 判断class是否存在
var hasClass = function (element,classname){
	return element.className.match( new RegExp("(\\s|^)"+classname+"(\\s|$)") )
}

// 添加link或style的css规则
var insertRule = function(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule != "undefined") {	//w3c
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule != "undefined"){ //ie
		sheet.addRule(selectorText,cssText,position);
	}
}
// 移除link或style的css规则
var deleteRule = function(sheet,index){
	if(typeof sheet.deleteRule != "undefined") {	//w3c
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != "undefined"){ //ie
		sheet.removeRule(index);
	}
}
// 获取Event对象
var getEvent = function(event){
	return 	event || window.event;
}
// 阻止默认行为
var preDef = function (e){
	var e = getEvent(e);
	if(typeof e.preventDefault != "undefined") {//w3c
		e.preventDefault();	
	}else{// IE
		e.returnValue = false;				
	}
}

// 删除前后空格
var trim = function(str){
	return str.replace(/(^\s*)|(\s*$)/g,"")
}  

// 滚动条清零
var scrollTop = function(){
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}